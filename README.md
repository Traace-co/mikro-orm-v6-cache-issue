## Description

`TsMorphMetadataProvider` does not discover entities when using import with paths relative to the `baseUrl` :

```typescript
import {Organization} from "src/entities/organization.entity";
```

instead of

```typescript
import {Organization} from "./organization.entity";
```

## How to reproduce

```shell
npm run mikro:cache:generate
```

outputs :

```shell
> mikro-orm-v6@1.0.0 mikro:cache:generate
> mikro-orm cache:generate

[discovery] ORM entity discovery started, using TsMorphMetadataProvider
[discovery] - processing entity Organization
[discovery] - processing entity User
mikro-orm cache:generate

Generate metadata cache

Options:
--config         Set path to the ORM configuration file           [string]
--ts-node, --ts  Use ts-node to generate '.ts' cache             [boolean]
-c, --combined       Generate production cache into a single JSON file that
can be used with the GeneratedCacheAdapter.
-v, --version        Show version number                             [boolean]
-h, --help           Show help                                       [boolean]

MetadataError: Entity 'any' was not discovered, please make sure to provide it in 'entities' array when initializing the ORM (used in User.organization)
at Function.fromUnknownEntity (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/errors.js:170:16)
at /home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:86:46
at Array.forEach (<anonymous>)
at /home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:84:67
at Array.forEach (<anonymous>)
at MetadataValidator.validateDiscovered (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:84:20)
at MetadataDiscovery.findEntities (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:145:24)
at MetadataDiscovery.discover (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:43:20)
at Object.handler (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/cli/commands/GenerateCacheCommand.js:33:25) {
entity: undefined
}
```

We add these lines in the `initSourcesFiles` function in `TsMorphMetadataProvider` :

```javascript
const diagnostics = this.project.getPreEmitDiagnostics()
console.log(this.project.formatDiagnosticsWithColorAndContext(diagnostics))
```

We get the following output :

```shell

> mikro-orm-v6@1.0.0 mikro:cache:generate
> mikro-orm cache:generate

[discovery] ORM entity discovery started, using TsMorphMetadataProvider
[discovery] - processing entity Organization
src/entities/organization.entity.ts:3:2 - error TS1238: Unable to resolve signature of class decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.

3 @Entity()
   ~~~~~~~~
src/entities/organization.entity.ts:6:6 - error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'undefined' is not assignable to parameter of type 'Partial<any>'.

6     @PrimaryKey({type: 'numeric'})
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/entities/organization.entity.ts:9:6 - error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'ClassFieldDecoratorContext<Organization, string> & { name: "name"; private: false; static: false; }' is not assignable to parameter of type 'string'.

9     @Property({type: 'character varying'})
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/entities/user.entity.ts:2:28 - error TS2307: Cannot find module 'src/entities/organization.entity' or its corresponding type declarations.

2 import {Organization} from "src/entities/organization.entity";
                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/entities/user.entity.ts:4:2 - error TS1238: Unable to resolve signature of class decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.

4 @Entity()
   ~~~~~~~~
src/entities/user.entity.ts:6:6 - error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'undefined' is not assignable to parameter of type 'Partial<any>'.

6     @PrimaryKey({type: 'numeric'})
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/entities/user.entity.ts:9:6 - error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'ClassFieldDecoratorContext<User, string> & { name: "name"; private: false; static: false; }' is not assignable to parameter of type 'string'.

9     @Property({type: 'character varying'})
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/entities/user.entity.ts:12:6 - error TS1240: Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'undefined' is not assignable to parameter of type 'Partial<any>'.

12     @ManyToOne()
        ~~~~~~~~~~~

[discovery] - processing entity User
mikro-orm cache:generate

Generate metadata cache

Options:
      --config         Set path to the ORM configuration file           [string]
      --ts-node, --ts  Use ts-node to generate '.ts' cache             [boolean]
  -c, --combined       Generate production cache into a single JSON file that
                       can be used with the GeneratedCacheAdapter.
  -v, --version        Show version number                             [boolean]
  -h, --help           Show help                                       [boolean]

MetadataError: Entity 'any' was not discovered, please make sure to provide it in 'entities' array when initializing the ORM (used in User.organization)
    at Function.fromUnknownEntity (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/errors.js:170:16)
    at /home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:86:46
    at Array.forEach (<anonymous>)
    at /home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:84:67
    at Array.forEach (<anonymous>)
    at MetadataValidator.validateDiscovered (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:84:20)
    at MetadataDiscovery.findEntities (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:145:24)
    at MetadataDiscovery.discover (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:43:20)
    at Object.handler (/home/maxime/traace-projects/mikro-orm-v6/node_modules/@mikro-orm/cli/commands/GenerateCacheCommand.js:33:25) {
  entity: undefined
}

```

`TsMorphMetadataProvider` instanciate a `Project` 