var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function tabClass(active, ellipsis) {
  var classes = ['tab-class'];

  if (active) {
    classes.push('tab-active-class');
  }

  if (ellipsis) {
    classes.push('van-ellipsis');
  }

  return classes.join(' ');
}

function tabStyle(active, ellipsis, color, type, disabled, activeColor, inactiveColor, swipeThreshold, scrollable) {
  var styles = [];
  var isCard = type === 'card'; // card theme color

  if (color && isCard) {
    styles.push('border-color:' + color);

    if (!disabled) {
      if (active) {
        styles.push('background-color:' + color);
      } else {
        styles.push('color:' + color);
      }
    }
  }

  var titleColor = active ? activeColor : inactiveColor;

  if (titleColor) {
    styles.push('color:' + titleColor);
  }

  if (scrollable && ellipsis) {
    styles.push('flex-basis:' + 88 / swipeThreshold + '%');
  }

  return styles.join(';');
}

function tabCardTypeBorderStyle(color, type) {
  var isCard = type === 'card';
  var styles = [];

  if (isCard && color) {
    styles.push('border-color:' + color);
  }

  return styles.join(';');
}

function trackStyle(data) {
  if (!data.animated) {
    return '';
  }

  return [['left', -100 * data.currentIndex + '%'], ['-webkit-transition-duration', data.duration + 's'], ['transition-duration: ', data.duration + 's']].map(function (item) {
    return item.join(':');
  }).join(';');
}

function lineStyle(data) {
  var styles = [['width', utils.addUnit(data.lineWidth)], ['transform', 'translateX(' + data.lineOffsetLeft + 'px)'], ['-webkit-transform', 'translateX(' + data.lineOffsetLeft + 'px)']];

  if (data.color) {
    styles.push(['background-color', data.color]);
  }

  if (data.lineHeight !== -1) {
    styles.push(['height', utils.addUnit(data.lineHeight)]);
    styles.push(['border-radius', utils.addUnit(data.lineHeight)]);
  }

  if (!data.skipTransition) {
    styles.push(['transition-duration', data.duration + 's']);
    styles.push(['-webkit-transition-duration', data.duration + 's']);
  }

  return styles.map(function (item) {
    return item.join(':');
  }).join(';');
}

antmove_export = {
  tabClass: tabClass,
  tabStyle: tabStyle,
  trackStyle: trackStyle,
  lineStyle: lineStyle,
  tabCardTypeBorderStyle: tabCardTypeBorderStyle
};
export default antmove_export;