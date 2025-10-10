interface SvgIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  className?: string;
  color?: string;
  size?: number | string;
  key?: string | number;
  stroke?: string;
}

const SvgIcon: React.FC<SvgIconProps> = (props) => {
  const { icon: Icon, className = "", color, size = 24, key, stroke } = props;
  return (
    <Icon
      key={key}
      className={className}
      width={size}
      fill={color}
      stroke={stroke}
      height={size}
      aria-hidden="true"
    />
  );
};

export default SvgIcon;
