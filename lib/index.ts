type IProp = {
  elList: string[],
  rgba?: string,
  maskClass?: string,
  zIndex?: number,
}

export class NewerGuide {
  private w = window.innerWidth
  private h = window.innerHeight
  offset = 0
  elList = []
  maskContainer = null
  canvas: HTMLCanvasElement = null
  ctx: CanvasRenderingContext2D = null
  rgba = ''
  maskClass = ''
  zIndex = 0

  constructor({
    elList = [],
    rgba = 'rgba(0, 0, 0, 0.5)',
    maskClass = 'mask-el',
    zIndex = 1000,
  }: IProp) {
    this.elList = elList;
    this.rgba = rgba;
    this.maskClass = maskClass;
    this.zIndex = zIndex;

    this.init()
  }

  /** 初始化添加 canvas 及 context */
  private init() {
    const canvas = document.createElement(`canvas`)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.canvas = canvas

    const ctx = canvas.getContext('2d')
    this.ctx = ctx
  }

  /** 进行到下一步的引导 */
  step  = () => {
    if (this.offset === 0) {
      this.startAction()
    }
    this.fillRect()
    this.offset++

    if (this.offset > this.elList.length) {
      this.endAction()
    }
  }
  /** 引导开始时，在顶层添加 mask 遮罩 */
  private startAction() {
    const mask = document.createElement(`div`)
    const maskId = `asd` + Date.now()
    mask.innerHTML = `<div id="${maskId}" class="${this.maskClass}" style="position: fixed;top: 0; left: 0; right: 0; bottom: 0; z-index: ${this.zIndex}; background: ${this.rgba};pointer-events: none;"></div>`
    const maskContainer = mask.querySelector(`#${maskId}`)
    document.body.appendChild(maskContainer)
    this.maskContainer = maskContainer
  }

  /** 引导结束，销毁 mask  */
  private endAction() {
    this.destory()
  }
  destory() {
    this.maskContainer.remove()
  }

  /** 在 canvas 上绘制图片，作为 mask 的url */
  private fillRect = () => {
    const { w, h, } = this
    const selector = this.elList[this.offset]
    const el = (document.querySelector(selector) as HTMLElement)
    const rect = el?.getBoundingClientRect()
    
    if (!rect) return null;
    this.bindEvent()

    const imageData = this.ctx.createImageData(w, h)
    const data = imageData.data

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        const start = 4 * (j * w + i) 

        data[start] = data[start + 1] = data[start + 2] = 0
        if (i >= rect.x && i <= (rect.x + rect.width) && j >= rect.y && j <= (rect.y + rect.height)) {
          data[start + 3] = 0
        } else {
          data[start + 3] = 255
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0)
    this.setMask(this.maskContainer, this.canvas.toDataURL())
  }
  private bindEvent() {
    const { elList, offset, } = this
    document.querySelector(elList[offset]).addEventListener(`click`, this.step)
    document.querySelector(elList[offset - 1])?.removeEventListener(`click`, this.step)
  }

  private setMask (el: HTMLElement, src) {
    const { w, h } = this
    el.style.webkitMask = `url(${src}) 0 0 / ${w}px ${h}px`
    el.style.mask = `url(${src}) 0 0 / ${w}px ${h}px`
  }
}