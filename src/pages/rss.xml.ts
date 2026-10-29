import { feed } from '../lib/feeds';
import { MAIN } from '../lib/site';

export const GET = () => feed(MAIN);
