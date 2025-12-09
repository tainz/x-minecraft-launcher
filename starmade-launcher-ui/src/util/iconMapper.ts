import { h, Component } from 'vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import BugIcon from '@/components/icons/BugIcon.vue';
import ArchiveIcon from '@/components/icons/ArchiveIcon.vue';
import DevIcon from '@/components/icons/DevIcon.vue';
import RocketIcon from '@/components/icons/RocketIcon.vue';
import PlanetIcon from '@/components/icons/PlanetIcon.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import ServerIcon from '@/components/icons/ServerIcon.vue';
import CodeBracketIcon from '@/components/icons/CodeBracketIcon.vue';
import BoltIcon from '@/components/icons/BoltIcon.vue';
import BeakerIcon from '@/components/icons/BeakerIcon.vue';
import CubeIcon from '@/components/icons/CubeIcon.vue';
import GamepadIcon from '@/components/icons/GamepadIcon.vue';

export const getIconComponent = (icon: string, size: 'large' | 'small' = 'small') => {
  const sizeClass = size === 'large' ? "w-16 h-16" : "w-6 h-6";
  
  let comp: Component;
  let colorClass = "";

  switch(icon) {
    case 'latest': comp = CheckIcon; colorClass = "text-green-400"; break;
    case 'release': comp = CheckIcon; colorClass = "text-green-400"; break;
    case 'dev': comp = BugIcon; colorClass = "text-orange-400"; break;
    case 'pre': comp = DevIcon; colorClass = "text-yellow-400"; break;
    case 'archive': comp = ArchiveIcon; colorClass = "text-gray-400"; break;
    case 'rocket': comp = RocketIcon; colorClass = "text-indigo-400"; break;
    case 'planet': comp = PlanetIcon; colorClass = "text-sky-400"; break;
    case 'star': comp = StarIcon; colorClass = "text-yellow-300"; break;
    case 'server': comp = ServerIcon; colorClass = "text-slate-400"; break;
    case 'code': comp = CodeBracketIcon; colorClass = "text-emerald-400"; break;
    case 'bolt': comp = BoltIcon; colorClass = "text-amber-400"; break;
    case 'beaker': comp = BeakerIcon; colorClass = "text-purple-400"; break;
    case 'cube': comp = CubeIcon; colorClass = "text-rose-400"; break;
    default: comp = GamepadIcon; colorClass = "text-gray-400"; break;
  }

  return h(comp, { className: `${sizeClass} ${colorClass}` });
}
