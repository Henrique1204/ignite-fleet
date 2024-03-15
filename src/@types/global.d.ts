import { IconProps } from "phosphor-react-native";

type IDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type IYearsTwoThousand = '20';
type IYearsThousand = '19';

declare global {
    export type IconElement = (props: IconProps) => JSX.Element;
}