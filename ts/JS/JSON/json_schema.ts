/**
 * @JSON schema
 * 
 */

interface JSONSchema {
  // 元数据
  $schema?: string;
  $id?: string;
  $ref?: string;
  $defs?: Record<string, JSONSchema>;
  title?: string;
  description?: string;
  default?: any;
  examples?: any[];
  
  // 类型
  type?: string | string[];
  enum?: any[];
  const?: any;
  
  // 字符串
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  
  // 数值
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  
  // 数组
  items?: JSONSchema | JSONSchema[];
  additionalItems?: boolean | JSONSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  contains?: JSONSchema;
  
  // 对象
  properties?: Record<string, JSONSchema>; // 属性

  patternProperties?: Record<string, JSONSchema>;
  additionalProperties?: boolean | JSONSchema;
  required?: string[];
  propertyNames?: JSONSchema;
  minProperties?: number;
  maxProperties?: number;
  dependentRequired?: Record<string, string[]>;
  dependentSchemas?: Record<string, JSONSchema>;
  
  // 组合
  allOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  not?: JSONSchema;
  
  // 条件
  if?: JSONSchema;
  then?: JSONSchema;
  else?: JSONSchema;
  
  // 标注
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  $comment?: string;
  
  // 内容
  contentMediaType?: string;
  contentEncoding?: string;
  contentSchema?: JSONSchema;
}


const ExampleSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    roles: {
      type: 'array',
      items: { type: 'string' },
      enum: ['admin', 'user', 'guest']
    }
  },
  required: ['id', 'name']
};