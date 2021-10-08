# Flame-Design
尝试使用 **React + Typescript** 搭建组件库


## Example
### Tabs
```tsx
<Tabs>
    <TabItem label='111'>Hello World</TabItem>
    <TabItem label='222' disabled>See you</TabItem>
    <TabItem label='333'>Bye Bye</TabItem>
</Tabs>
```
#### Attributes
`label: string`：控制标题文本
`disabled?: boolean`：是否禁用
`onSelect?: selectCallback`：被选中后回调函数

