import classNames from "classnames";
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Input } from "./input";
import SvgIcon from "./svg-icon";
import { AppIcons } from "../../assets/svg";

export type DropdownOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  customSelect?: ReactNode;
  className?: string;
  disabled?: boolean;
  portalTarget?: string;
};

export type DropdownActions = {
  select: (val: string) => void;
  getSelect: () => DropdownOption | null;
};

export const Dropdown = React.forwardRef<DropdownActions, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      customSelect,
      className,
      portalTarget = "dropdownSelect",
      disabled = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
      options.find((opt) => opt.value === value) || null
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Update selected option when value prop changes
    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        setSelectedOption(option || null);
      } else {
        setSelectedOption(null);
      }
    }, [value, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: DropdownOption) => {
      setSelectedOption(option);
      onChange?.(option.value);
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      select: (val) => {
        if (disabled) return;
        const selected = options.find((opt) => opt.value === val) || null;
        if (selected) {
          handleOptionClick(selected);
        }
      },

      getSelect: () => selectedOption,
    }));

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const renderDropdownContent = () => {
      if (customSelect) {
        return customSelect;
      }

      return (
        <div className="max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={classNames(
                "px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center gap-3",
                selectedOption?.value === option.value
                  ? "bg-[#2D2F36] text-white"
                  : "text-[#E5E7EB] hover:bg-[#2D2F36]"
              )}
            >
              {option.icon && (
                <span className="flex-shrink-0">{option.icon}</span>
              )}
              <span className="flex-1">{option.label}</span>
              {selectedOption?.value === option.value && (
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}

          {options.length === 0 && (
            <div className="px-4 py-3 text-[#6B7280] text-center">
              No options available
            </div>
          )}
        </div>
      );
    };

    const renderDropdownMenu = () => {
      const dropdownContent = (
        <div
          ref={dropdownRef}
          className="absolute top-0 left-0 w-full bg-[#1A1C22] border border-[#2D2F36] rounded-2xl shadow-lg z-50"
          // style={{
          //   top: `${position.top}px`,
          //   left: `${position.left}px`,
          //   // width: `${position.width}px`,
          // }}
        >
          {renderDropdownContent()}
        </div>
      );

      // Use portal if target specified, otherwise render normally
      if (portalTarget) {
        const targetElement = document.getElementById(portalTarget);
        if (targetElement) {
          return createPortal(dropdownContent, targetElement);
        }
      }

      // Default portal to document body
      return createPortal(dropdownContent, document.body);
    };

    return (
      <div className={classNames("relative", className)} ref={dropdownRef}>
        {/* Input trigger */}
        <div onClick={toggleDropdown} id="dropdownSelect">
          <Input
            readOnly
            value={selectedOption?.label || ""}
            placeholder={placeholder}
            suffixIcon={<SvgIcon icon={AppIcons["ArrowDown"]} />}
            className={classNames(
              "cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && renderDropdownMenu()}
      </div>
    );
  }
);
