// abstract class AbstractModel {
//     protected abstract getModelName(): string;
// }
//
// class MyModel extends AbstractModel {
//     protected getModelName() {
//         return 'MyModel';
//     }
//
//     protected sayModelName() {
//         console.log( this.getModelName() )
//     }
// }
//
// class MyModel2 extends AbstractModel {
//     protected getModelName() {
//         return 'MyModel2';
//     }
//
//     protected sayModelName() {
//         console.log( this.getModelName() )
//     }
// }
//
// abstract class ModelsCollectionAbstract {
//     protected abstract getModels(): typeof AbstractModel[] | AbstractModel[];
// }
//
// class MyModelsCollection extends ModelsCollectionAbstract {
//     protected getModels() {
//         return [
//             // OR, OK TOO!
//             // new MyModel(),
//             // new MyModel2(),
//
//             // OR, OK TOO!
//             MyModel,
//             MyModel2,
//         ];
//     }
//
//     public sayModelNames() {
//         const models = this.getModels();
//
//         for (const ModelClass of models) {
//             class Wrapper extends ModelClass {
//                 public sayModelNameExternally() {
//                     return this.sayModelName(); // TS2339: Property sayModelName does not exist on type Wrapper
//                 }
//             }
//
//             console.log(ModelClass.sayModelName()); // TS2445: Property sayModelName is protected and only accessible within class AbstractModel and its subclasses.
//         }
//     }
// }

abstract class AbstractModel {
    protected abstract getModelName(): string;
    protected abstract sayModelName(): void;
}

class MyModel extends AbstractModel {
    protected getModelName() {
        return 'MyModel';
    }

    protected sayModelName() {
        console.log(this.getModelName());
    }
}

class MyModel2 extends AbstractModel {
    protected getModelName() {
        return 'MyModel2';
    }

    protected sayModelName() {
        console.log(this.getModelName());
    }
}

type AbstractConstructor<T> = abstract new (...args: any[]) => T

// Mixin to add a public method that calls the protected method
// function SayModelNameMixin<T extends new (...args: any[]) => AbstractModel>(Base: T) {
function SayModelNameMixin<T extends AbstractConstructor<AbstractModel>>(Ctor: T) {
    abstract class Wrapper extends Ctor {
        public sayModelNameExternally() {
            this.sayModelName(); // Accessing protected method
        }
    };

    return Wrapper
}

abstract class ModelsCollectionAbstract {
    protected abstract getModels(): (new () => AbstractModel)[];
}

class MyModelsCollection extends ModelsCollectionAbstract {
    protected getModels() {
        return [MyModel, MyModel2]; // Returning class constructors
    }

    public sayModelNames() {
        const modelClasses = this.getModels();

        for (const ModelClass of modelClasses) {
            const WrappedModelClass = SayModelNameMixin(ModelClass); // Apply mixin
            const modelInstance = new WrappedModelClass(); // Create an instance of the wrapped class
            modelInstance.sayModelNameExternally(); // Call the public wrapper
        }
    }
}

const collection = new MyModelsCollection();
collection.sayModelNames(); // Output: "MyModel", "MyModel2"



// Tell how? guard works
export abstract class BaseChannel extends Base {
    public constructor(client: Client<true>, data?: RawChannelData, immediatePatch?: boolean);
    public get createdAt(): Date | null;
    public get createdTimestamp(): number | null;
    public id: Snowflake;
    public flags: Readonly<ChannelFlagsBitField> | null;
    public get partial(): false;
    public type: ChannelType;
    public get url(): string;
    public delete(): Promise<this>;
    public fetch(force?: boolean): Promise<this>;
    public isThread(): this is AnyThreadChannel;
    public isTextBased(): this is TextBasedChannel;
    public isDMBased(): this is PartialGroupDMChannel | DMChannel | PartialDMChannel;
    public isVoiceBased(): this is VoiceBasedChannel;
    public isThreadOnly(): this is ThreadOnlyChannel;
    public isSendable(): this is SendableChannels;
    public toString(): ChannelMention | UserMention;
}


private async sendEmbedCommand( channel: Channel, response: any, message: Message ) {
    if ( ! channel.isSendable() ) {
        await message.reply( "Message was not sent!" );
        return;
    }

    channel.send( { embeds: [ this.buildEmbed( response ) ] } )
        .catch( async () => {
            await message.reply( "Message was not sent!" );
        } )
        .then( async () => {
            await message.reply( "Message sent!" );
        } );
}
