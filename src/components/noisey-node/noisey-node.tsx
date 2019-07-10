import { Component, h, Host, Listen, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'gthmb-noisey-node',
    styleUrl: 'noisey-node.css'
})
export class NoiseyNode {
    /**
     * The level of the noise!
     */
    @Prop() noiseLevel: number;

    noiseTick: number;

    readonly maxNoiseTick: number = 40;

    noiseHolder: HTMLSpanElement;

    slotHolder: HTMLSpanElement;

    container: HTMLSpanElement;

    host: HTMLElement;

    slot: HTMLSlotElement;

    layers: HTMLElement[];

    componentDidLoad() {
        this.chop();
    }

    render() {
        return (
            <Host ref={el => (this.host = el)}>
                <span id="container" ref={el => (this.container = el)}>
                    <slot />
                </span>
                <span id="noise-holder" ref={el => (this.noiseHolder = el)} />
            </Host>
        );
    }

    @Listen('mousemove')
    handleMouseMove() {
        this.startNoise();
    }

    @Watch('noiseLevel')
    handleNoiseLevelChange() {
        this.chop();
    }

    private chop = () => {
        const layerSize = 100 / this.noiseLevel;
        this.layers = [];
        for (let i = 0; i < this.noiseLevel; i++) {
            const noiseLayer = document.createElement('span');
            noiseLayer.classList.add('noise-layer');

            this.container.childNodes.forEach(child =>
                noiseLayer.appendChild(child.cloneNode(true))
            );

            const top = 100 - i * layerSize - layerSize;
            const bottom = i * layerSize;
            noiseLayer.style.clipPath = `inset(${top}% 0% ${bottom}% 0%)`;

            this.noiseHolder.appendChild(noiseLayer);
            this.layers.push(noiseLayer);
        }
    };

    private startNoise = () => {
        this.noiseTick = 0;
        this.noiseHolder.style.visibility = 'visible';
        requestAnimationFrame(() => {
            this.applyNoise();
        });
    };

    private applyNoise() {
        const lastTick = ++this.noiseTick >= this.maxNoiseTick;
        this.layers.forEach(layer => {
            const randX = Math.random() * 3 * (Math.random() > 0.5 ? 1 : -1);
            const randY = Math.random() * (Math.random() > 0.5 ? 1 : -1);
            layer.style.transform = lastTick
                ? `translate3d(0, 0, 0)`
                : `translate3d(${randX}px, ${randY}px, 0)`;
        });
        if (!lastTick) {
            requestAnimationFrame(() => {
                this.applyNoise();
            });
        } else {
            // this.noiseHolder.style.visibility = 'hidden';
        }
    }
}
