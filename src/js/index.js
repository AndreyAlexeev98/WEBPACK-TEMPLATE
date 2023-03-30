import { toggleClass } from './module.js';
import { analitic } from './analitics.js';
import '../css/main.scss';
import '../html/template.twig';

toggleClass('.elem', 'active');
analitic();

console.log(TEST);