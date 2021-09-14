import { shallowMount } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List.vue', () => {
    test('test', () => {
        const wrapper = shallowMount(List);
        expect(wrapper).toMatchSnapshot();
    })
})