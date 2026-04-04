# React — Hydration

**Hydration** is the process where React attaches event listeners and makes server-rendered HTML interactive on the client side. It "hydrates" the static HTML with React's dynamic capabilities.

## How Hydration Works

When using Server-Side Rendering (SSR), the server sends fully rendered HTML to the browser. The client then:

1. Displays the static HTML immediately (fast initial paint)
2. Downloads the JavaScript bundle
3. React "hydrates" the existing DOM by attaching event handlers without recreating DOM nodes

```jsx
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
hydrateRoot(container, <App />);
```

## Hydration vs Render

```jsx
import { createRoot, hydrateRoot } from 'react-dom/client';

createRoot(container).render(<App />);

hydrateRoot(container, <App />);
```

- **`createRoot().render()`**: Creates DOM nodes from scratch, replacing container contents
- **`hydrateRoot()`**: Preserves existing server-rendered HTML and attaches React to it

## Hydration Mismatches

A mismatch occurs when server-rendered HTML differs from what React expects on the client.

```jsx
function Timestamp() {
  return <span>{Date.now()}</span>;
}
```

This causes a mismatch because the timestamp differs between server and client render times.

## Fixing Common Mismatches

Use `useEffect` for client-only values:

```jsx
function Timestamp() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(Date.now());
  }, []);

  return <span>{time ?? 'Loading...'}</span>;
}
```

Or use the `suppressHydrationWarning` attribute for intentional mismatches:

```jsx
<time suppressHydrationWarning>
  {new Date().toLocaleString()}
</time>
```

## Real-World Example: State Hydration

Hydration also applies to state management, where serialized data (like IDs) is "hydrated" with full objects from a data source.

```tsx
const CameraStep: React.FC<StepComponentProps> = ({ initialData }) => {
  const typedInitialData = initialData as StepsData['cameras'] | undefined;
  const [selectedCameras, setSelectedCameras] = useState<CameraSchedule[]>(typedInitialData || []);
  const hasInitializedRef = useRef(false);

  const { data } = useQuery<{ cameraComplex1: CameraSchedule[] }>(CAMERA_COMPLEX_1);

  useEffect(() => {
    if (hasInitializedRef.current || !typedInitialData?.length || !data?.cameraComplex1) {
      return;
    }

    const initialIds = new Set(typedInitialData.map((camera) => camera.id));
    const hydratedCameras = data.cameraComplex1.filter((camera) => initialIds.has(camera.id));

    if (hydratedCameras.length > 0) {
      setSelectedCameras(hydratedCameras);
      hasInitializedRef.current = true;
    }
  }, [typedInitialData, data]);

  return <div>{/* render cameras */}</div>;
};
```

**How it works**:
1. `initialData` contains partial/serialized camera data (IDs only)
2. `useQuery` fetches the full camera objects from the server
3. The `useEffect` "hydrates" the initial IDs with complete camera objects
4. `hasInitializedRef` ensures hydration runs only once

## Key Points

- **Hydration** attaches React to server-rendered HTML without recreating DOM nodes
- **Performance benefit**: Users see content immediately while JavaScript loads
- **Mismatches** occur when server and client HTML differ, causing React warnings
- **Solutions**: Use `useEffect` for client-only data or `suppressHydrationWarning` for acceptable mismatches
