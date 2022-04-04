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
    const text = computed(() => generate(state.value));
    expect(text.value).not.toBe('Waiting');

    state.value.isWaiting = true;
    expect(text.value).toBe('Waiting');

    state.value.isWaiting = true;
    expect(text.value).toBe('Waiting');

    state.value.isWalletConnected = true;
    expect(text.value).toBe('Waiting');
    state.value.isWalletApproved = true;
    expect(text.value).toBe('Waiting');

    state.value.isStaked = true;
    expect(text.value).toBe('Waiting');
    state.value.isRestakeAvailable = true;
    expect(text.value).toBe('Waiting');
    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Waiting');
  });

  it('connect wallet state with the second priority', () => {
    const text = computed(() => generate(state.value));
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletConnected = false;
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletApproved = true;
    expect(text.value).toBe('Connect wallet');

    state.value.isStaked = true;
    expect(text.value).toBe('Connect wallet');
    state.value.isRestakeAvailable = true;
    expect(text.value).toBe('Connect wallet');
    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Connect wallet');
  });

  it('approve wallet state with the third priority', () => {
    const text = computed(() => generate(state.value));
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(text.value).toBe('Approve wallet');

    state.value.isStaked = true;
    expect(text.value).toBe('Approve wallet');
    state.value.isRestakeAvailable = true;
    expect(text.value).toBe('Approve wallet');
    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Approve wallet');
  });

  it('is staked state with the fouth priority', () => {
    const text = computed(() => generate(state.value));
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(text.value).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(text.value).toBe('Stake');

    state.value.isRestakeAvailable = true;
    expect(text.value).toBe('Stake');
    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Stake');
  });

  it('is restaked available state with the fifth priority', () => {
    const text = computed(() => generate(state.value));
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(text.value).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(text.value).toBe('Stake');

    state.value.isStaked = true;
    expect(text.value).toBe('');

    state.value.isRestakeAvailable = true;
    expect(text.value).toBe('Restake');

    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Restake');
  });

  it('is replenish available state with the sixth priority', () => {
    const text = computed(() => generate(state.value));
    expect(text.value).toBe('Connect wallet');

    state.value.isWalletConnected = true;
    expect(text.value).toBe('Approve wallet');

    state.value.isWalletApproved = true;
    expect(text.value).toBe('Stake');

    state.value.isStaked = true;
    expect(text.value).toBe('');

    state.value.isReplenishAvailable = true;
    expect(text.value).toBe('Replenish');
  });
});
