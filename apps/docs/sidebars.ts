import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar for documentation
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/overview'],
    },
    {
      type: 'category',
      label: 'Object-Oriented Programming',
      items: [
        'oop/terms',
        'oop/design-patterns',
        'oop/composition-vs-inheritance',
      ],
    },
    {
      type: 'category',
      label: 'Data Engineering',
      items: [
        'data-engineering/terms',
        'data-engineering/services',
      ],
    },
    {
      type: 'category',
      label: 'JavaScript',
      items: [
        'javascript/var-let-const',
        'javascript/event-loop',
        'javascript/shallow-vs-deep-comparison',
      ],
    },
    {
      type: 'category',
      label: 'React',
      items: [
        'react/mount-vs-render',
        'react/render-and-effect-order',
        'react/effect-vs-layout-effect',
        'react/stale-closures',
        'react/use-imperative-handle',
        'react/context-re-render-trap',
        'react/reconciliation',
        'react/hydrate',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'typescript/satisfies-operator',
        'typescript/discriminated-unions',
        'typescript/type-narrowing-strategies',
        'typescript/class-hierarchies-instanceof',
        'typescript/user-defined-type-guards',
        'typescript/in-operator-narrowing',
        'typescript/function-overloading',
        'typescript/generics-with-constrained-shapes',
        'typescript/enums-plus-lookup-maps',
        'typescript/sum-types-via-classes-visit',
        'typescript/pattern-matching-libraries',
        'typescript/schema-driven-refinement',
        'typescript/union-of-primitives-structural-unions',
      ],
    },
    {
      type: 'category',
      label: 'Dictionary',
      items: ['dictionary/overview'],
    },
  ],
};

export default sidebars;
