import { DirectiveBinding } from 'vue';

export const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    (el as any).clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', (el as any).clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent);
  },
};
