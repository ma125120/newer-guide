## 安装

```
npm i newer-guide
```

## 使用

### 初始化

```javascript
import { NewerGuide } from 'newer-guide'

/**
 * elList，需要引导的 元素 选择器列表，必填
 * rgba = 'rgba(0, 0, 0, 0.5)'； 遮罩层的背景颜色
 * maskClass = 'mask-el'； 遮罩层的class
    zIndex = 1000； 遮罩层的 zIndex
 */
const guide = new NewerGuide({ elList: ['button', '.sd'] })
```

### 开始引导

```javascript
guide.step()
```