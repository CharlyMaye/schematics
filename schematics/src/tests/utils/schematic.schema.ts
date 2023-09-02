export interface SchematicSchema {
    type: string;
    options: { [key: string]: unknown };
    children: SchematicSchema[];
}
