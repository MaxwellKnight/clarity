import { SVGProps } from 'react';
import './icon.css';
import { SVGOptions } from '../../types';
import { useDynamicSVG } from '../../hooks';

type IconProps = SVGProps<HTMLDivElement> & SVGOptions & {
	name: string
	svg?: Record<string, string>;
};

const Icon = ({
	name, 
	onCompleted, 
	onError, 
	svg, 
	...rest
}: IconProps) => {
	const {error, loading, SVGContent} = useDynamicSVG(name, {onCompleted, onError});

	if(error) return error;
	if(loading) return "...";

	if(SVGContent) {
		const modifiedSvgContent = svg
      ? SVGContent.replace('<svg', `<svg ${Object.entries(svg).map(([key, value]) => `${key}="${value}"`).join(' ')}`)
      : SVGContent;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: modifiedSvgContent }}
        {...rest}
      />
    );
	}

	return null;
}

export default Icon;