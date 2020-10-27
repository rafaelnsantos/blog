import React, { useCallback, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import styled from 'styled-components';
import { CmsField } from 'netlify-cms-core';
import Widget from '@monx/react-netlifycms/dist/Widget';

const Button = styled.button`
  min-width: 120px;
  padding: 8px;
  background: #ffffff;
  display: inline-block;
  cursor: pointer;
  border-radius: 25px;
  text-align: left;
`;

const ColorDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
`;

const Hex = styled.span`
  vertical-align: middle;
  line-height: 30px;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

interface ColorField extends CmsField {
  default?: string;
  alpha?: boolean;
}

export const ColorWidget = Widget<string, ColorField>(
  ({ onChange, params, value }) => {
    const DEFAULT_COLOR = params.default || '#ffffff';

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleChangeComplete = useCallback((color: ColorResult) => {
      let colorHex: string;

      if (params.alpha && color.rgb.a) {
        colorHex = color.hex + Math.round(color.rgb.a * 255).toString(16);
      } else {
        colorHex = color.hex;
      }
      onChange(colorHex.toUpperCase());
    }, []);

    const handleClick = () => setDisplayColorPicker(!displayColorPicker);

    const handleClose = () => setDisplayColorPicker(false);

    return (
      <div>
        <Button onClick={handleClick} type="button">
          <ColorDiv style={{ background: value, borderColor: 'black', borderWidth: 1 }} />
          <Hex>{value}</Hex>
        </Button>
        {displayColorPicker ? (
          <PopOver>
            <Cover tabIndex={0} onClick={handleClose} onKeyPress={handleClose} />
            <ChromePicker
              onChange={handleChangeComplete}
              color={value || DEFAULT_COLOR}
              disableAlpha={!params.alpha}
            />
          </PopOver>
        ) : null}
      </div>
    );
  },
  {
    activateFix: true,
  }
);
