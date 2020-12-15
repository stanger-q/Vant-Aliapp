// @ts-nocheck
import { isObj, requestAnimationFrame } from '../common/utils';
const getClassNames = (name) => ({
  enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
  leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`,
});
export function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow',
      },
      // @ts-ignore
      duration: {
        type: null,
        value: 300,
        observer: 'observeDuration',
      },
      name: {
        type: String,
        value: 'fade',
      },
    },
    data: {
      type: '',
      inited: false,
      display: false,
    },
    methods: {
      onClick () {
          this.$emit('click')
      },
      observeShow(value, old) {
        if (value === old) {
          return;
        }
        value ? this.enter() : this.leave();
      },
      enter() {
        const { duration, name } = this.data;
        if (wx.__target__ === 'alipay') {
          const {enterClass,enterActiveClass,enterToClass} = this.props
        }
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.enter : duration;
        this.status = 'enter';
        this.$emit('before-enter');
        requestAnimationFrame(() => {
          this.checkStatus('enter');
          this.$emit('enter');
          if (wx.__target__ === 'alipay') {
            this.setData({
              inited: true,
              display: true,
              classes: `${classNames.enter} ${enterClass} ${enterActiveClass}`,
              currentDuration,
            });
          } else {
            this.setData({
              inited: true,
              display: true,
              classes: classNames.enter,
              currentDuration,
            });
          }
          requestAnimationFrame(() => {
            this.checkStatus('enter');
            this.transitionEnded = false;
            if (wx.__target__ === 'alipay') {
              this.setData({ classes: `${classNames['enter-to']} ${enterActiveClass} ${enterToClass}` });
            } else {
              this.setData({classes: classNames['enter-to']})
            }
          });
        });
      },
      leave() {
        if (!this.data.display) {
          return;
        }
        const { duration, name } = this.data;
        if (wx.__target__ === 'alipay') {
          const {leaveClass, leaveActiveClass, leaveToClass} = this.props
        }
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.leave : duration;
        this.status = 'leave';
        this.$emit('before-leave');
        requestAnimationFrame(() => {
          this.checkStatus('leave');
          this.$emit('leave');
          if (wx.__target__ === 'alipay') {
            this.setData({
              classes: `${classNames.leave} ${leaveClass} ${leaveActiveClass}`,
              currentDuration,
            });
          } else {
            this.setData({
              classes: classNames.leave,
              currentDuration,
            });
          }
          requestAnimationFrame(() => {
            this.checkStatus('leave');
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), currentDuration);
            if (wx.__target__ = 'alipay') {
              this.setData({ classes: `${classNames['leave-to']} ${leaveActiveClass} ${leaveToClass}` });
            } else {
              this.setData({ classes: classNames['leave-to'] });
            }
          });
        });
      },
      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },
      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }
        this.transitionEnded = true;
        this.$emit(`after-${this.status}`);
        const { show, display } = this.data;
        if (!show && display && !this.isDestroyed) {
          this.setData({ display: false });
        }
      },
    },
  });
}
