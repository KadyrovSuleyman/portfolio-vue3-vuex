// import { mount } from '@vue/test-utils';
// import NavButton from '../../../src/component/navButton/navButton.vue';

// it('test navButton', () => {
//   const wrapper = mount(NavButton, {
//     props: {
//       msg: 'hello',
//     },
//   });

//   const navButton = wrapper.get('.navPanel-navButton');
//   expect(navButton).not.toBeNull();

//   const link = wrapper.get('.navButton-link');
//   expect(wrapper.html()).toContain('hello');
//   expect(link.text()).toBe('hello');
// });

// it('test navButton when selected', () => {
//   const wrapper = mount(NavButton, {
//     props: {
//       selected: true,
//     },
//   });

//   const navButton = wrapper.get('.navPanel-navButton__selected');
//   expect(navButton).not.toBeNull();

//   const link = wrapper.get('.navButton-link__selected');
//   expect(link).not.toBeNull();

//   const rectangle = wrapper.get('.navButton-rectangle__selected');
//   expect(rectangle).not.toBeNull();
// });
