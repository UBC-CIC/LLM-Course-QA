type colText = 'gray' | 'primary' | 'error' | 'warning' | 'success' | 'blue-gray' | 'blue-light' | 'indigo' | 'purple' | 'pink' | 'rose' | 'orange' | 'blue';
type colNum = 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type Colour = `${colText}-${colNum}` | 'white' | 'black';
export type Weight = 'regular' | 'medium' | 'semibold' | 'bold';
export type Shadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';