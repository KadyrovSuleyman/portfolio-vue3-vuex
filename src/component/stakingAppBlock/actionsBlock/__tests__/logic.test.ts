import { computed, Ref, ref } from 'vue';
import { StateListT } from '../adapter';
import generate from '../logic';

describe('generateMainButtonText works', () => {
  let state: Ref<StateListT>;
  beforeEach(() => {
    state = ref({
      isWalletConnected: false,
      isWalletApproved: false,
      isWaiting: false,
      isStaked: false,
      isReplenishAvailable: false,
      isRestakeAvailable: false,
    });
  });

  it('waiting state with the highest priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).not.toBe('Waiting');

    state.value.isWaiting = true;
    expect(props.value.text).toBe('Waiting');

    state.value.isWaiting = true;
    expect(props.value.text).toBe('Waiting');

    state.value.isWalletConnected = true;
    expect(props.value.text).toBe('Waiting');
    state.value.isWalletApproved = true;
    expect(props.value.text).toBe('Waiting');

    state.value.isStaked = true;
    expect(props.value.text).toBe('Waiting');
    state.value.isRestakeAvailable = true;
    expect(props.value.text).toBe('Waiting');
    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Waiting');
  });

  it('connect wallet state with the second priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletConnected = false;
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletApproved = true;
    expect(props.value.text).toBe('Connect wallet');

    state.value.isStaked = true;
    expect(props.value.text).toBe('Connect wallet');
    state.value.isRestakeAvailable = true;
    expect(props.value.text).toBe('Connect wallet');
    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Connect wallet');
  });

  it('approve wallet state with the third priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(props.value.text).toBe('Approve wallet');

    state.value.isStaked = true;
    expect(props.value.text).toBe('Approve wallet');
    state.value.isRestakeAvailable = true;
    expect(props.value.text).toBe('Approve wallet');
    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Approve wallet');
  });

  it('is staked state with the fouth priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(props.value.text).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(props.value.text).toBe('Stake');

    state.value.isRestakeAvailable = true;
    expect(props.value.text).toBe('Stake');
    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Stake');
  });

  it('is restaked available state with the fifth priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(props.value.text).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(props.value.text).toBe('Stake');

    state.value.isStaked = true;
    expect(props.value.text).toBe('');

    state.value.isRestakeAvailable = true;
    expect(props.value.text).toBe('Restake');

    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Restake');
  });

  it('is replenish available state with the sixth priority', () => {
    const props = computed(() => generate(state.value));
    expect(props.value.text).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(props.value.text).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(props.value.text).toBe('Stake');

    state.value.isStaked = true;
    expect(props.value.text).toBe('');

    state.value.isReplenishAvailable = true;
    expect(props.value.text).toBe('Replenish');
  });
});
