import { Component, h, Listen, State } from '@stencil/core';
import { BRIGHTNESS_4_SVG, BRIGHTNESS_7_SVG } from './img-brightness.icons';

const MIN_BRIGHTNESS = 0.01;
const MAX_BRIGHTNESS = 2;
const STEP_SIZE = 0.05;

@Component({
    tag: 'img-brightness',
    styleUrl: 'img-brightness.css',
    shadow: true
})
export class ImgBrightness {
    @State() brightness: number;

    sliderInput: HTMLInputElement;

    componentWillLoad() {
        this.brightness = 1;
    }

    @Listen('keydown', { target: 'body' })
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this.decrement();
        } else if (event.key == 'ArrowUp') {
            this.increment();
        }
    }

    decrement() {
        this.brightness = Math.max(this.brightness - STEP_SIZE, MIN_BRIGHTNESS);
    }

    increment() {
        this.brightness = Math.min(this.brightness + STEP_SIZE, MAX_BRIGHTNESS);
    }

    updateBrightness() {
        this.brightness = Number(this.sliderInput.value);
    }

    render() {
        const style = {
            filter: `brightness(${this.brightness})`
        };

        return (
            <div class="container">
                <div class="adjust-me" style={{ ...style }}>
                    <slot />
                </div>
                <div class="controls-container">
                    <div innerHTML={BRIGHTNESS_4_SVG} />
                    <input
                        ref={(el: HTMLInputElement) => (this.sliderInput = el)}
                        type="range"
                        min={MIN_BRIGHTNESS}
                        max={MAX_BRIGHTNESS}
                        step={STEP_SIZE}
                        value={this.brightness}
                        onInput={() => this.updateBrightness()}
                    />
                    <div innerHTML={BRIGHTNESS_7_SVG} />
                </div>
            </div>
        );
    }
}

interface IBar {
    hello: string;
    world: number;
}

type Foo<T = any> = T & {
    bar: string;
};

const yo: Foo<IBar> = {
    hello: 'world',
    world: 12,
    bar: 'baz'
};

console.log('yo', yo);
