import {Entity, ManyToOne, PrimaryKey, Property, Ref} from "@mikro-orm/core";
import {Organization} from "src/entities/organization.entity";

@Entity()
export class User {
    @PrimaryKey({type: 'numeric'})
    public readonly id: number

    @Property({type: 'character varying'})
    public readonly name: string

    @ManyToOne()
    public readonly organization: Ref<Organization>
}