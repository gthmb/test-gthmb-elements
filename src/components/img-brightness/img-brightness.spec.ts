import { TestWindow } from '@stencil/core/testing';
import { ImgBrightness } from './img-brightness';

describe('img-brightness', () => {
    it('should build', () => {
        expect(new ImgBrightness()).toBeTruthy();
    });

    describe('rendering', () => {
        let element: HTMLMyComponentElement;
        let testWindow: TestWindow;
        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [ImgBrightness],
                html: '<img-brightness></img-brightness>'
            });
        });
    });
});
