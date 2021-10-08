# Flame-Design
尝试使用 **React + Typescript** 搭建组件库

---
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
| Attribute                 | Function         |
| ------------------------- | ---------------- |
| `label: string`             | 控制标题文本     |
| `disabled?: boolean`        | 是否禁用         |
| `onSelect?: selectCallback` | 被选中后回调函数 |
---

## 模块打包
`npm run build`

```json
"scripts": {
    "start": "react-scripts start",
    "build": "npm run clean && npm run build-ts && npm run build-css",
    "clean": "rimraf ./build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build-ts": "tsc -p tsconfig.build.json",
    "build-css": "node-sass ./src/styles/index.scss ./build/index.css",
    "storybook": "start-storybook -p 6006 -s public",
    "build-storybook": "build-storybook -s public"
  },
```
