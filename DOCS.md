## Modules

<dl>
<dt><a href="#module_postcss-load-config">postcss-load-config</a></dt>
<dd><p>Autoload Config for PostCSS</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#rc">rc(ctx, path, options)</a> ⇒ <code>Promise</code></dt>
<dd><p>Load Config</p>
</dd>
</dl>

<a name="module_postcss-load-config"></a>

## postcss-load-config
Autoload Config for PostCSS

**Requires**: <code>module:comsiconfig</code>, <code>module:./options</code>, <code>module:./plugins</code>  
**Version**: 2.0.0  
**Author**: Michael Ciniawsky @michael-ciniawsky <michael.ciniawsky@gmail.com>  
**License**: MIT  
<a name="rc"></a>

## rc(ctx, path, options) ⇒ <code>Promise</code>
Load Config

**Kind**: global function  
**Returns**: <code>Promise</code> - config PostCSS Config  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | Config Context |
| path | <code>String</code> | Config Path |
| options | <code>Object</code> | Config Options |


* [rc(ctx, path, options)](#rc) ⇒ <code>Promise</code>
    * [~ctx](#rc..ctx) : <code>Object</code>
    * [~path](#rc..path) : <code>String</code>
    * [~options](#rc..options) : <code>Object</code>

<a name="rc..ctx"></a>

### rc~ctx : <code>Object</code>
**Kind**: inner property of [<code>rc</code>](#rc)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cwd | <code>String</code> | <code>process.cwd()</code> | Config search start location |
| env | <code>String</code> | <code>process.env.NODE_ENV</code> | Config Enviroment, will be set to `development` by `postcss-load-config` if `process.env.NODE_ENV` is `undefined` |

<a name="rc..path"></a>

### rc~path : <code>String</code>
`process.cwd()`

**Kind**: inner property of [<code>rc</code>](#rc)  
<a name="rc..options"></a>

### rc~options : <code>Object</code>
**Kind**: inner property of [<code>rc</code>](#rc)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| rcExtensions | <code>Boolean</code> | <code>true</code> | 

