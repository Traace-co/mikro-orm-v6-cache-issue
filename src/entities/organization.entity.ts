import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Organization {

    @PrimaryKey({type: 'numeric'})
    public readonly id: number

    @Property({type: 'character varying'})
    public readonly name: string
}