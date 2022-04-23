import { TariffT } from '@/store/tariff/types.d';

const tariffList: TariffT[] = [
  {
    period: 30,
    apy: 103.23,
    amountMin: 100,
    amountMax: 299,
  },
  {
    period: 90,
    apy: 116.86,
    amountMin: 100,
    amountMax: 299,
  },
  {
    period: 150,
    apy: 129.97,
    amountMin: 500,
    amountMax: 1000,
  },
];

export default tariffList;
