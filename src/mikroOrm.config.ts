import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Organization} from "./entities/organization.entity";
import {User} from "./entities/user.entity";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {PostgreSqlOptions} from "@mikro-orm/postgresql/PostgreSqlMikroORM";

const configuration: PostgreSqlOptions  = {
    driver : PostgreSqlDriver,
    dbName : 'database',
    discovery : {
        requireEntitiesArray: true,
        alwaysAnalyseProperties : true
    },
    entities : [
        User,
        Organization
    ],
    metadataProvider: TsMorphMetadataProvider,
}

export default configuration