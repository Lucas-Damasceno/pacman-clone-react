import { atom } from 'recoil'

//red, pink, orange, cyan
type possibleColors = '#F70000' | '#F7B2F7' | '#FFB851' | '#009999';

const GhostColor = atom<possibleColors[]>({
  key: 'GhostColor', // unique ID (with respect to other atoms/selectors)
  default: ['#F70000', '#F7B2F7', '#FFB851', '#009999'],
});

export default GhostColor