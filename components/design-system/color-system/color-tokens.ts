/**
 * Plus UI color system - token structure.
 *
 * Extracted from Figma file `vR3AuW3jxvnMMMMLDQvYJ6`: "Color Palette" (`4922:7320`)
 * and "Color Classification" (`4922:8423`). Snapshot: `artifacts/figma/color-system.json`.
 *
 * This module carries the *shape* of the system - token names, the Figma variables they
 * come from, and which layer aliases which. The colour values themselves live only in
 * `app/globals.css`, so anything rendering from this module reads the real theme.
 */

export const colorShades = ['950', '900', '800', '700', '600', '500', '400', '300', '200', '100', '50'] as const;

export type ColorShade = (typeof colorShades)[number];

/** A `--color-*` theme token, without the `--color-` prefix. */
export type ColorTokenName = string;

/** CSS value that resolves a theme token through the cascade. */
export function colorVar(token: ColorTokenName): string {
  return `var(--color-${token})`;
}

export type BaseToken = {
  token: ColorTokenName;
  label: string;
  figmaVariable: string;
  figmaNodeId: string;
};

/** Layer 1 - the two base values of the Figma palette. */
export const baseTokens: BaseToken[] = [
  { token: 'base-black', label: 'Black', figmaVariable: 'base/black', figmaNodeId: '4922:7334' },
  { token: 'base-white', label: 'White', figmaVariable: 'base/white', figmaNodeId: '4922:7339' },
];

export type PrimitiveFamily = {
  name: string;
  label: string;
  /** Figma node id of the ramp frame. */
  figmaNodeId: string;
  /** Figma node id of each swatch rectangle in the ramp. */
  shadeNodeIds: Record<ColorShade, string>;
};

/** Layer 1 - the 22 primitive ramps of Figma "Color Palette" (`4922:7320`). */
export const primitiveFamilies: PrimitiveFamily[] = [
  {
    name: 'slate',
    label: 'Slate',
    figmaNodeId: '4922:7343',
    shadeNodeIds: { '950': '4922:7347', '900': '4922:7348', '800': '4922:7349', '700': '4922:7350', '600': '4922:7351', '500': '4922:7352', '400': '4922:7353', '300': '4922:7354', '200': '4922:7355', '100': '4922:7356', '50': '4922:7357' },
  },
  {
    name: 'gray',
    label: 'Gray',
    figmaNodeId: '4922:7392',
    shadeNodeIds: { '950': '4922:7396', '900': '4922:7397', '800': '4922:7398', '700': '4922:7399', '600': '4922:7400', '500': '4922:7401', '400': '4922:7402', '300': '4922:7403', '200': '4922:7404', '100': '4922:7405', '50': '4922:7406' },
  },
  {
    name: 'zinc',
    label: 'Zinc',
    figmaNodeId: '4922:7441',
    shadeNodeIds: { '950': '4922:7445', '900': '4922:7446', '800': '4922:7447', '700': '4922:7448', '600': '4922:7449', '500': '4922:7450', '400': '4922:7451', '300': '4922:7452', '200': '4922:7453', '100': '4922:7454', '50': '4922:7455' },
  },
  {
    name: 'neutral',
    label: 'Neutral',
    figmaNodeId: '4922:7490',
    shadeNodeIds: { '950': '4922:7494', '900': '4922:7495', '800': '4922:7496', '700': '4922:7497', '600': '4922:7498', '500': '4922:7499', '400': '4922:7500', '300': '4922:7501', '200': '4922:7502', '100': '4922:7503', '50': '4922:7504' },
  },
  {
    name: 'stone',
    label: 'Stone',
    figmaNodeId: '4922:7539',
    shadeNodeIds: { '950': '4922:7543', '900': '4922:7544', '800': '4922:7545', '700': '4922:7546', '600': '4922:7547', '500': '4922:7548', '400': '4922:7549', '300': '4922:7550', '200': '4922:7551', '100': '4922:7552', '50': '4922:7553' },
  },
  {
    name: 'red',
    label: 'Red',
    figmaNodeId: '4922:7588',
    shadeNodeIds: { '950': '4922:7592', '900': '4922:7593', '800': '4922:7594', '700': '4922:7595', '600': '4922:7596', '500': '4922:7597', '400': '4922:7598', '300': '4922:7599', '200': '4922:7600', '100': '4922:7601', '50': '4922:7602' },
  },
  {
    name: 'orange',
    label: 'Orange',
    figmaNodeId: '4922:7637',
    shadeNodeIds: { '950': '4922:7641', '900': '4922:7642', '800': '4922:7643', '700': '4922:7644', '600': '4922:7645', '500': '4922:7646', '400': '4922:7647', '300': '4922:7648', '200': '4922:7649', '100': '4922:7650', '50': '4922:7651' },
  },
  {
    name: 'amber',
    label: 'Amber',
    figmaNodeId: '4922:7686',
    shadeNodeIds: { '950': '4922:7690', '900': '4922:7691', '800': '4922:7692', '700': '4922:7693', '600': '4922:7694', '500': '4922:7695', '400': '4922:7696', '300': '4922:7697', '200': '4922:7698', '100': '4922:7699', '50': '4922:7700' },
  },
  {
    name: 'yellow',
    label: 'Yellow',
    figmaNodeId: '4922:7735',
    shadeNodeIds: { '950': '4922:7739', '900': '4922:7740', '800': '4922:7741', '700': '4922:7742', '600': '4922:7743', '500': '4922:7744', '400': '4922:7745', '300': '4922:7746', '200': '4922:7747', '100': '4922:7748', '50': '4922:7749' },
  },
  {
    name: 'lime',
    label: 'Lime',
    figmaNodeId: '4922:7784',
    shadeNodeIds: { '950': '4922:7788', '900': '4922:7789', '800': '4922:7790', '700': '4922:7791', '600': '4922:7792', '500': '4922:7793', '400': '4922:7794', '300': '4922:7795', '200': '4922:7796', '100': '4922:7797', '50': '4922:7798' },
  },
  {
    name: 'green',
    label: 'Green',
    figmaNodeId: '4922:7833',
    shadeNodeIds: { '950': '4922:7837', '900': '4922:7838', '800': '4922:7839', '700': '4922:7840', '600': '4922:7841', '500': '4922:7842', '400': '4922:7843', '300': '4922:7844', '200': '4922:7845', '100': '4922:7846', '50': '4922:7847' },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    figmaNodeId: '4922:7882',
    shadeNodeIds: { '950': '4922:7886', '900': '4922:7887', '800': '4922:7888', '700': '4922:7889', '600': '4922:7890', '500': '4922:7891', '400': '4922:7892', '300': '4922:7893', '200': '4922:7894', '100': '4922:7895', '50': '4922:7896' },
  },
  {
    name: 'teal',
    label: 'Teal',
    figmaNodeId: '4922:7931',
    shadeNodeIds: { '950': '4922:7935', '900': '4922:7936', '800': '4922:7937', '700': '4922:7938', '600': '4922:7939', '500': '4922:7940', '400': '4922:7941', '300': '4922:7942', '200': '4922:7943', '100': '4922:7944', '50': '4922:7945' },
  },
  {
    name: 'cyan',
    label: 'Cyan',
    figmaNodeId: '4922:7980',
    shadeNodeIds: { '950': '4922:7984', '900': '4922:7985', '800': '4922:7986', '700': '4922:7987', '600': '4922:7988', '500': '4922:7989', '400': '4922:7990', '300': '4922:7991', '200': '4922:7992', '100': '4922:7993', '50': '4922:7994' },
  },
  {
    name: 'sky',
    label: 'Sky',
    figmaNodeId: '4922:8029',
    shadeNodeIds: { '950': '4922:8033', '900': '4922:8034', '800': '4922:8035', '700': '4922:8036', '600': '4922:8037', '500': '4922:8038', '400': '4922:8039', '300': '4922:8040', '200': '4922:8041', '100': '4922:8042', '50': '4922:8043' },
  },
  {
    name: 'blue',
    label: 'Blue',
    figmaNodeId: '4922:8078',
    shadeNodeIds: { '950': '4922:8082', '900': '4922:8083', '800': '4922:8084', '700': '4922:8085', '600': '4922:8086', '500': '4922:8087', '400': '4922:8088', '300': '4922:8089', '200': '4922:8090', '100': '4922:8091', '50': '4922:8092' },
  },
  {
    name: 'indigo',
    label: 'Indigo',
    figmaNodeId: '4922:8127',
    shadeNodeIds: { '950': '4922:8131', '900': '4922:8132', '800': '4922:8133', '700': '4922:8134', '600': '4922:8135', '500': '4922:8136', '400': '4922:8137', '300': '4922:8138', '200': '4922:8139', '100': '4922:8140', '50': '4922:8141' },
  },
  {
    name: 'violet',
    label: 'Violet',
    figmaNodeId: '4922:8176',
    shadeNodeIds: { '950': '4922:8180', '900': '4922:8181', '800': '4922:8182', '700': '4922:8183', '600': '4922:8184', '500': '4922:8185', '400': '4922:8186', '300': '4922:8187', '200': '4922:8188', '100': '4922:8189', '50': '4922:8190' },
  },
  {
    name: 'purple',
    label: 'Purple',
    figmaNodeId: '4922:8225',
    shadeNodeIds: { '950': '4922:8229', '900': '4922:8230', '800': '4922:8231', '700': '4922:8232', '600': '4922:8233', '500': '4922:8234', '400': '4922:8235', '300': '4922:8236', '200': '4922:8237', '100': '4922:8238', '50': '4922:8239' },
  },
  {
    name: 'fuchsia',
    label: 'Fuschia',
    figmaNodeId: '4922:8274',
    shadeNodeIds: { '950': '4922:8278', '900': '4922:8279', '800': '4922:8280', '700': '4922:8281', '600': '4922:8282', '500': '4922:8283', '400': '4922:8284', '300': '4922:8285', '200': '4922:8286', '100': '4922:8287', '50': '4922:8288' },
  },
  {
    name: 'pink',
    label: 'Pink',
    figmaNodeId: '4922:8323',
    shadeNodeIds: { '950': '4922:8327', '900': '4922:8328', '800': '4922:8329', '700': '4922:8330', '600': '4922:8331', '500': '4922:8332', '400': '4922:8333', '300': '4922:8334', '200': '4922:8335', '100': '4922:8336', '50': '4922:8337' },
  },
  {
    name: 'rose',
    label: 'Rose',
    figmaNodeId: '4922:8372',
    shadeNodeIds: { '950': '4922:8376', '900': '4922:8377', '800': '4922:8378', '700': '4922:8379', '600': '4922:8380', '500': '4922:8381', '400': '4922:8382', '300': '4922:8383', '200': '4922:8384', '100': '4922:8385', '50': '4922:8386' },
  },
];

export type SemanticFamily = {
  name: string;
  label: string;
  /** Primitive ramp this family aliases, one to one across all 11 shades. */
  primitive: string;
  figmaNodeId: string;
  description: string;
};

/** Layer 2 - Figma "Color Classification" (`4922:8423`). */
export const semanticFamilies: SemanticFamily[] = [
  {
    name: 'default',
    label: 'Default (Neutral)',
    primitive: 'gray',
    figmaNodeId: '4922:9551',
    description:
      'Explore the nuanced shades of gray within our palette, each thoughtfully classified to cater to specific designs. From soft undertones to deeper shades, our documentation elucidates how the default gray acts as a unifying force, providing a solid foundation for your design while allowing other colors to shine.',
  },
  {
    name: 'primary',
    label: 'Primary',
    primitive: 'indigo',
    figmaNodeId: '4922:9605',
    description:
      'Elevate your brand presence with Plus UI\'s primary color - Indigo. Explore the nuanced shades and variations of Indigo within our palette, each carefully classified for specific design contexts.',
  },
  {
    name: 'info',
    label: 'Info',
    primitive: 'blue',
    figmaNodeId: '4922:9659',
    description:
      'The Info Color blue aligns with accessibility principles, providing a balanced contrast that enhances readability and usability. Whether used in tooltips, notifications, or other informational elements, this shade of blue serves as a reliable beacon, guiding users through your application with clarity and precision.',
  },
  {
    name: 'success',
    label: 'Success',
    primitive: 'green',
    figmaNodeId: '4922:9713',
    description:
      'The Success Color green aligns with accessibility standards, providing not only a visually pleasing experience but also a clear and distinguishable visual cue. Whether used in buttons, notifications, or other success-related elements, this shade of green adds a touch of positivity to your interface, creating a user experience that feels rewarding and encouraging.',
  },
  {
    name: 'warning',
    label: 'Warning',
    primitive: 'yellow',
    figmaNodeId: '4922:9767',
    description:
      'The Warning Color yellow aligns with accessibility standards, providing a clear and attention-grabbing visual cue while maintaining readability. Whether used in form validations, notifications, or other warning elements, this shade of yellow serves as a reliable signal for users to exercise caution without creating undue stress.',
  },
  {
    name: 'danger',
    label: 'Danger',
    primitive: 'red',
    figmaNodeId: '4922:9821',
    description:
      'The Danger Color red aligns with accessibility standards, providing a clear and prominent visual cue while maintaining readability. Whether used in error messages, validation prompts, or other error-related elements, this shade of red serves as a powerful indicator, prompting users to take corrective actions with confidence.',
  },
];

export type RoleTokenSide = {
  /** Ramp reference exactly as the Figma table writes it, e.g. `neutral/100`. */
  figmaRef: string | null;
  /** Layer 1 or 2 token this side aliases, or `null` for a literal value. */
  aliasOf: ColorTokenName | null;
};

export type RoleToken = {
  token: ColorTokenName;
  figmaVariable: string;
  light: RoleTokenSide;
  dark: RoleTokenSide;
};

export type RoleTokenGroup = {
  name: string;
  label: string;
  figmaNodeId: string;
  tokens: RoleToken[];
};

/** The interaction states the background roles are defined for. */
export const roleStates = ['default', 'hovered', 'pressed', 'focused', 'loading'] as const;

export type RoleState = (typeof roleStates)[number];

export const colorModes = ['light', 'dark'] as const;

export type ColorMode = (typeof colorModes)[number];

/** Layer 3 - Figma "Color Tokens" (`4922:6167`). */
export const roleTokenGroups: RoleTokenGroup[] = [
  {
    name: 'background',
    label: 'color.background',
    figmaNodeId: '4922:51050',
    tokens: [
      {
        token: 'background-default-default',
        figmaVariable: 'color/background/default/default',
        light: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
        dark: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
      },
      {
        token: 'background-default-hovered',
        figmaVariable: 'color/background/default/hovered',
        light: { figmaRef: 'neutral/200', aliasOf: 'default-200' },
        dark: { figmaRef: 'neutral/800', aliasOf: 'default-800' },
      },
      {
        token: 'background-default-pressed',
        figmaVariable: 'color/background/default/pressed',
        light: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
        dark: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
      },
      {
        token: 'background-default-focused',
        figmaVariable: 'color/background/default/focused',
        light: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
        dark: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
      },
      {
        token: 'background-default-loading',
        figmaVariable: 'color/background/default/loading',
        light: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
        dark: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
      },
      {
        token: 'background-default-invert-default',
        figmaVariable: 'color/background/default/invert/default',
        light: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
        dark: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
      },
      {
        token: 'background-default-invert-hovered',
        figmaVariable: 'color/background/default/invert/hovered',
        light: { figmaRef: 'neutral/800', aliasOf: 'default-800' },
        dark: { figmaRef: 'neutral/200', aliasOf: 'default-200' },
      },
      {
        token: 'background-default-invert-pressed',
        figmaVariable: 'color/background/default/invert/pressed',
        light: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
        dark: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
      },
      {
        token: 'background-default-invert-focused',
        figmaVariable: 'color/background/default/invert/focused',
        light: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
        dark: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
      },
      {
        token: 'background-default-invert-loading',
        figmaVariable: 'color/background/default/invert/loading',
        light: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
        dark: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
      },
      {
        token: 'background-primary-default',
        figmaVariable: 'color/background/primary/default',
        light: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
        dark: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
      },
      {
        token: 'background-primary-hovered',
        figmaVariable: 'color/background/primary/hovered',
        light: { figmaRef: 'primary/800', aliasOf: 'primary-800' },
        dark: { figmaRef: 'primary/200', aliasOf: 'primary-200' },
      },
      {
        token: 'background-primary-pressed',
        figmaVariable: 'color/background/primary/pressed',
        light: { figmaRef: 'primary/900', aliasOf: 'primary-900' },
        dark: { figmaRef: 'primary/100', aliasOf: 'primary-100' },
      },
      {
        token: 'background-primary-focused',
        figmaVariable: 'color/background/primary/focused',
        light: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
        dark: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
      },
      {
        token: 'background-primary-loading',
        figmaVariable: 'color/background/primary/loading',
        light: { figmaRef: 'primary/900', aliasOf: 'primary-900' },
        dark: { figmaRef: 'primary/100', aliasOf: 'primary-100' },
      },
      {
        token: 'background-primary-invert-default',
        figmaVariable: 'color/background/primary/invert/default',
        light: { figmaRef: 'primary/100', aliasOf: 'primary-100' },
        dark: { figmaRef: 'primary/900', aliasOf: 'primary-900' },
      },
      {
        token: 'background-primary-invert-hovered',
        figmaVariable: 'color/background/primary/invert/hovered',
        light: { figmaRef: 'primary/200', aliasOf: 'primary-200' },
        dark: { figmaRef: 'primary/800', aliasOf: 'primary-800' },
      },
      {
        token: 'background-primary-invert-pressed',
        figmaVariable: 'color/background/primary/invert/pressed',
        light: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
        dark: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
      },
      {
        token: 'background-primary-invert-focused',
        figmaVariable: 'color/background/primary/invert/focused',
        light: { figmaRef: 'primary/100', aliasOf: 'primary-100' },
        dark: { figmaRef: 'primary/900', aliasOf: 'primary-900' },
      },
      {
        token: 'background-primary-invert-loading',
        figmaVariable: 'color/background/primary/invert/loading',
        light: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
        dark: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
      },
      {
        token: 'background-info-default',
        figmaVariable: 'color/background/info/default',
        light: { figmaRef: 'info/700', aliasOf: 'info-700' },
        dark: { figmaRef: 'info/300', aliasOf: 'info-300' },
      },
      {
        token: 'background-info-hovered',
        figmaVariable: 'color/background/info/hovered',
        light: { figmaRef: 'info/800', aliasOf: 'info-800' },
        dark: { figmaRef: 'info/200', aliasOf: 'info-200' },
      },
      {
        token: 'background-info-pressed',
        figmaVariable: 'color/background/info/pressed',
        light: { figmaRef: 'info/900', aliasOf: 'info-900' },
        dark: { figmaRef: 'info/100', aliasOf: 'info-100' },
      },
      {
        token: 'background-info-focused',
        figmaVariable: 'color/background/info/focused',
        light: { figmaRef: 'info/700', aliasOf: 'info-700' },
        dark: { figmaRef: 'info/300', aliasOf: 'info-300' },
      },
      {
        token: 'background-info-loading',
        figmaVariable: 'color/background/info/loading',
        light: { figmaRef: 'info/900', aliasOf: 'info-900' },
        dark: { figmaRef: 'info/100', aliasOf: 'info-100' },
      },
      {
        token: 'background-info-invert-default',
        figmaVariable: 'color/background/info/invert/default',
        light: { figmaRef: 'info/100', aliasOf: 'info-100' },
        dark: { figmaRef: 'info/900', aliasOf: 'info-900' },
      },
      {
        token: 'background-info-invert-hovered',
        figmaVariable: 'color/background/info/invert/hovered',
        light: { figmaRef: 'info/200', aliasOf: 'info-200' },
        dark: { figmaRef: 'info/800', aliasOf: 'info-800' },
      },
      {
        token: 'background-info-invert-pressed',
        figmaVariable: 'color/background/info/invert/pressed',
        light: { figmaRef: 'info/300', aliasOf: 'info-300' },
        dark: { figmaRef: 'info/700', aliasOf: 'info-700' },
      },
      {
        token: 'background-info-invert-focused',
        figmaVariable: 'color/background/info/invert/focused',
        light: { figmaRef: 'info/100', aliasOf: 'info-100' },
        dark: { figmaRef: 'info/900', aliasOf: 'info-900' },
      },
      {
        token: 'background-info-invert-loading',
        figmaVariable: 'color/background/info/invert/loading',
        light: { figmaRef: 'info/300', aliasOf: 'info-300' },
        dark: { figmaRef: 'info/700', aliasOf: 'info-700' },
      },
      {
        token: 'background-success-default',
        figmaVariable: 'color/background/success/default',
        light: { figmaRef: 'success/700', aliasOf: 'success-700' },
        dark: { figmaRef: 'success/300', aliasOf: 'success-300' },
      },
      {
        token: 'background-success-hovered',
        figmaVariable: 'color/background/success/hovered',
        light: { figmaRef: 'success/800', aliasOf: 'success-800' },
        dark: { figmaRef: 'success/200', aliasOf: 'success-200' },
      },
      {
        token: 'background-success-pressed',
        figmaVariable: 'color/background/success/pressed',
        light: { figmaRef: 'success/900', aliasOf: 'success-900' },
        dark: { figmaRef: 'success/100', aliasOf: 'success-100' },
      },
      {
        token: 'background-success-focused',
        figmaVariable: 'color/background/success/focused',
        light: { figmaRef: 'success/700', aliasOf: 'success-700' },
        dark: { figmaRef: 'success/300', aliasOf: 'success-300' },
      },
      {
        token: 'background-success-loading',
        figmaVariable: 'color/background/success/loading',
        light: { figmaRef: 'success/900', aliasOf: 'success-900' },
        dark: { figmaRef: 'success/100', aliasOf: 'success-100' },
      },
      {
        token: 'background-success-invert-default',
        figmaVariable: 'color/background/success/invert/default',
        light: { figmaRef: 'success/100', aliasOf: 'success-100' },
        dark: { figmaRef: 'success/900', aliasOf: 'success-900' },
      },
      {
        token: 'background-success-invert-hovered',
        figmaVariable: 'color/background/success/invert/hovered',
        light: { figmaRef: 'success/200', aliasOf: 'success-200' },
        dark: { figmaRef: 'success/800', aliasOf: 'success-800' },
      },
      {
        token: 'background-success-invert-pressed',
        figmaVariable: 'color/background/success/invert/pressed',
        light: { figmaRef: 'success/300', aliasOf: 'success-300' },
        dark: { figmaRef: 'success/700', aliasOf: 'success-700' },
      },
      {
        token: 'background-success-invert-focused',
        figmaVariable: 'color/background/success/invert/focused',
        light: { figmaRef: 'success/100', aliasOf: 'success-100' },
        dark: { figmaRef: 'success/900', aliasOf: 'success-900' },
      },
      {
        token: 'background-success-invert-loading',
        figmaVariable: 'color/background/success/invert/loading',
        light: { figmaRef: 'success/300', aliasOf: 'success-300' },
        dark: { figmaRef: 'success/700', aliasOf: 'success-700' },
      },
      {
        token: 'background-warning-default',
        figmaVariable: 'color/background/warning/default',
        light: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
        dark: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
      },
      {
        token: 'background-warning-hovered',
        figmaVariable: 'color/background/warning/hovered',
        light: { figmaRef: 'warning/800', aliasOf: 'warning-800' },
        dark: { figmaRef: 'warning/200', aliasOf: 'warning-200' },
      },
      {
        token: 'background-warning-pressed',
        figmaVariable: 'color/background/warning/pressed',
        light: { figmaRef: 'warning/900', aliasOf: 'warning-900' },
        dark: { figmaRef: 'warning/100', aliasOf: 'warning-100' },
      },
      {
        token: 'background-warning-focused',
        figmaVariable: 'color/background/warning/focused',
        light: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
        dark: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
      },
      {
        token: 'background-warning-loading',
        figmaVariable: 'color/background/warning/loading',
        light: { figmaRef: 'warning/900', aliasOf: 'warning-900' },
        dark: { figmaRef: 'warning/100', aliasOf: 'warning-100' },
      },
      {
        token: 'background-warning-invert-default',
        figmaVariable: 'color/background/warning/invert/default',
        light: { figmaRef: 'warning/100', aliasOf: 'warning-100' },
        dark: { figmaRef: 'warning/900', aliasOf: 'warning-900' },
      },
      {
        token: 'background-warning-invert-hovered',
        figmaVariable: 'color/background/warning/invert/hovered',
        light: { figmaRef: 'warning/200', aliasOf: 'warning-200' },
        dark: { figmaRef: 'warning/800', aliasOf: 'warning-800' },
      },
      {
        token: 'background-warning-invert-pressed',
        figmaVariable: 'color/background/warning/invert/pressed',
        light: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
        dark: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
      },
      {
        token: 'background-warning-invert-focused',
        figmaVariable: 'color/background/warning/invert/focused',
        light: { figmaRef: 'warning/100', aliasOf: 'warning-100' },
        dark: { figmaRef: 'warning/900', aliasOf: 'warning-900' },
      },
      {
        token: 'background-warning-invert-loading',
        figmaVariable: 'color/background/warning/invert/loading',
        light: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
        dark: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
      },
      {
        token: 'background-danger-default',
        figmaVariable: 'color/background/danger/default',
        light: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
        dark: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
      },
      {
        token: 'background-danger-hovered',
        figmaVariable: 'color/background/danger/hovered',
        light: { figmaRef: 'danger/800', aliasOf: 'danger-800' },
        dark: { figmaRef: 'danger/200', aliasOf: 'danger-200' },
      },
      {
        token: 'background-danger-pressed',
        figmaVariable: 'color/background/danger/pressed',
        light: { figmaRef: 'danger/900', aliasOf: 'danger-900' },
        dark: { figmaRef: 'danger/100', aliasOf: 'danger-100' },
      },
      {
        token: 'background-danger-focused',
        figmaVariable: 'color/background/danger/focused',
        light: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
        dark: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
      },
      {
        token: 'background-danger-loading',
        figmaVariable: 'color/background/danger/loading',
        light: { figmaRef: 'danger/900', aliasOf: 'danger-900' },
        dark: { figmaRef: 'danger/100', aliasOf: 'danger-100' },
      },
      {
        token: 'background-danger-invert-default',
        figmaVariable: 'color/background/danger/invert/default',
        light: { figmaRef: 'danger/100', aliasOf: 'danger-100' },
        dark: { figmaRef: 'danger/900', aliasOf: 'danger-900' },
      },
      {
        token: 'background-danger-invert-hovered',
        figmaVariable: 'color/background/danger/invert/hovered',
        light: { figmaRef: 'danger/200', aliasOf: 'danger-200' },
        dark: { figmaRef: 'danger/800', aliasOf: 'danger-800' },
      },
      {
        token: 'background-danger-invert-pressed',
        figmaVariable: 'color/background/danger/invert/pressed',
        light: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
        dark: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
      },
      {
        token: 'background-danger-invert-focused',
        figmaVariable: 'color/background/danger/invert/focused',
        light: { figmaRef: 'danger/100', aliasOf: 'danger-100' },
        dark: { figmaRef: 'danger/900', aliasOf: 'danger-900' },
      },
      {
        token: 'background-danger-invert-loading',
        figmaVariable: 'color/background/danger/invert/loading',
        light: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
        dark: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
      },
      {
        token: 'background-surface',
        figmaVariable: 'color/background/surface',
        light: { figmaRef: 'base/white', aliasOf: 'base-white' },
        dark: { figmaRef: 'base/white', aliasOf: 'base-white' },
      },
      {
        token: 'background-transparent',
        figmaVariable: 'color/background/transparent',
        light: { figmaRef: null, aliasOf: null },
        dark: { figmaRef: null, aliasOf: null },
      },
    ],
  },
  {
    name: 'text',
    label: 'color.text',
    figmaNodeId: '4922:50821',
    tokens: [
      {
        token: 'text-base',
        figmaVariable: 'color/text/base',
        light: { figmaRef: 'base/white', aliasOf: 'base-white' },
        dark: { figmaRef: 'neutral/950', aliasOf: 'default-950' },
      },
      {
        token: 'text-default',
        figmaVariable: 'color/text/default',
        light: { figmaRef: 'neutral/950', aliasOf: 'default-950' },
        dark: { figmaRef: 'base/white', aliasOf: 'base-white' },
      },
      {
        token: 'text-primary',
        figmaVariable: 'color/text/primary',
        light: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
        dark: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
      },
      {
        token: 'text-info',
        figmaVariable: 'color/text/info',
        light: { figmaRef: 'info/700', aliasOf: 'info-700' },
        dark: { figmaRef: 'info/300', aliasOf: 'info-300' },
      },
      {
        token: 'text-success',
        figmaVariable: 'color/text/success',
        light: { figmaRef: 'success/700', aliasOf: 'success-700' },
        dark: { figmaRef: 'success/300', aliasOf: 'success-300' },
      },
      {
        token: 'text-warning',
        figmaVariable: 'color/text/warning',
        light: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
        dark: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
      },
      {
        token: 'text-danger',
        figmaVariable: 'color/text/danger',
        light: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
        dark: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
      },
      {
        token: 'text-placeholder',
        figmaVariable: 'color/text/placeholder',
        light: { figmaRef: 'neutral/500', aliasOf: 'default-500' },
        dark: { figmaRef: 'neutral/500', aliasOf: 'default-500' },
      },
      {
        token: 'text-caption',
        figmaVariable: 'color/text/caption',
        light: { figmaRef: 'neutral/600', aliasOf: 'default-600' },
        dark: { figmaRef: 'neutral/400', aliasOf: 'default-400' },
      },
      {
        token: 'text-link',
        figmaVariable: 'color/text/link',
        light: { figmaRef: 'blue/700', aliasOf: 'blue-700' },
        dark: { figmaRef: 'blue/300', aliasOf: 'blue-300' },
      },
      {
        token: 'text-visited',
        figmaVariable: 'color/text/visited',
        light: { figmaRef: 'purple/700', aliasOf: 'purple-700' },
        dark: { figmaRef: 'purple/300', aliasOf: 'purple-300' },
      },
      {
        token: 'text-loading',
        figmaVariable: 'color/text/loading',
        light: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
        dark: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
      },
      {
        token: 'text-disabled',
        figmaVariable: 'color/text/disabled',
        light: { figmaRef: 'neutral/400', aliasOf: 'default-400' },
        dark: { figmaRef: 'neutral/600', aliasOf: 'default-600' },
      },
    ],
  },
  {
    name: 'text-invert',
    label: 'color.text.invert',
    figmaNodeId: '4922:50823',
    tokens: [
      {
        token: 'text-invert-base',
        figmaVariable: 'color/text/invert/base',
        light: { figmaRef: 'neutral/950', aliasOf: 'default-950' },
        dark: { figmaRef: 'base/white', aliasOf: 'base-white' },
      },
      {
        token: 'text-invert-default',
        figmaVariable: 'color/text/invert/default',
        light: { figmaRef: 'base/white', aliasOf: 'base-white' },
        dark: { figmaRef: 'neutral/950', aliasOf: 'default-950' },
      },
      {
        token: 'text-invert-primary',
        figmaVariable: 'color/text/invert/primary',
        light: { figmaRef: 'primary/100', aliasOf: 'primary-100' },
        dark: { figmaRef: 'primary/900', aliasOf: 'primary-900' },
      },
      {
        token: 'text-invert-info',
        figmaVariable: 'color/text/invert/info',
        light: { figmaRef: 'info/100', aliasOf: 'info-100' },
        dark: { figmaRef: 'info/900', aliasOf: 'info-900' },
      },
      {
        token: 'text-invert-success',
        figmaVariable: 'color/text/invert/success',
        light: { figmaRef: 'success/100', aliasOf: 'success-100' },
        dark: { figmaRef: 'success/900', aliasOf: 'success-900' },
      },
      {
        token: 'text-invert-warning',
        figmaVariable: 'color/text/invert/warning',
        light: { figmaRef: 'warning/100', aliasOf: 'warning-100' },
        dark: { figmaRef: 'warning/900', aliasOf: 'warning-900' },
      },
      {
        token: 'text-invert-danger',
        figmaVariable: 'color/text/invert/danger',
        light: { figmaRef: 'danger/100', aliasOf: 'danger-100' },
        dark: { figmaRef: 'danger/900', aliasOf: 'danger-900' },
      },
      {
        token: 'text-invert-placeholder',
        figmaVariable: 'color/text/invert/placeholder',
        light: { figmaRef: 'neutral/500', aliasOf: 'default-500' },
        dark: { figmaRef: 'neutral/500', aliasOf: 'default-500' },
      },
      {
        token: 'text-invert-caption',
        figmaVariable: 'color/text/invert/caption',
        light: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
        dark: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
      },
      {
        token: 'text-invert-link',
        figmaVariable: 'color/text/invert/link',
        light: { figmaRef: 'blue/100', aliasOf: 'blue-100' },
        dark: { figmaRef: 'blue/900', aliasOf: 'blue-900' },
      },
      {
        token: 'text-invert-visited',
        figmaVariable: 'color/text/invert/visited',
        light: { figmaRef: 'purple/100', aliasOf: 'purple-100' },
        dark: { figmaRef: 'purple/900', aliasOf: 'purple-900' },
      },
      {
        token: 'text-invert-loading',
        figmaVariable: 'color/text/invert/loading',
        light: { figmaRef: 'neutral/100', aliasOf: 'default-100' },
        dark: { figmaRef: 'neutral/900', aliasOf: 'default-900' },
      },
    ],
  },
  {
    name: 'border',
    label: 'color.border',
    figmaNodeId: '4922:50954',
    tokens: [
      {
        token: 'border-base',
        figmaVariable: 'color/border/base',
        light: { figmaRef: 'base/white', aliasOf: 'base-white' },
        dark: { figmaRef: 'gray/950', aliasOf: 'gray-950' },
      },
      {
        token: 'border-default',
        figmaVariable: 'color/border/default',
        light: { figmaRef: 'neutral/400', aliasOf: 'default-400' },
        dark: { figmaRef: 'neutral/600', aliasOf: 'default-600' },
      },
      {
        token: 'border-primary',
        figmaVariable: 'color/border/primary',
        light: { figmaRef: 'primary/700', aliasOf: 'primary-700' },
        dark: { figmaRef: 'primary/300', aliasOf: 'primary-300' },
      },
      {
        token: 'border-info',
        figmaVariable: 'color/border/info',
        light: { figmaRef: 'info/700', aliasOf: 'info-700' },
        dark: { figmaRef: 'info/300', aliasOf: 'info-300' },
      },
      {
        token: 'border-success',
        figmaVariable: 'color/border/success',
        light: { figmaRef: 'success/700', aliasOf: 'success-700' },
        dark: { figmaRef: 'success/300', aliasOf: 'success-300' },
      },
      {
        token: 'border-warning',
        figmaVariable: 'color/border/warning',
        light: { figmaRef: 'warning/700', aliasOf: 'warning-700' },
        dark: { figmaRef: 'warning/300', aliasOf: 'warning-300' },
      },
      {
        token: 'border-danger',
        figmaVariable: 'color/border/danger',
        light: { figmaRef: 'danger/700', aliasOf: 'danger-700' },
        dark: { figmaRef: 'danger/300', aliasOf: 'danger-300' },
      },
      {
        token: 'border-ring',
        figmaVariable: 'color/border/ring',
        light: { figmaRef: 'blue/300', aliasOf: 'blue-300' },
        dark: { figmaRef: 'blue/700', aliasOf: 'blue-700' },
      },
      {
        token: 'border-disabled',
        figmaVariable: 'color/border/disabled',
        light: { figmaRef: 'neutral/300', aliasOf: 'default-300' },
        dark: { figmaRef: 'neutral/700', aliasOf: 'default-700' },
      },
    ],
  },
];

/** Figma copy for the documentation frames, used as the story's section text. */
export const colorSystemCopy = {
  paletteTitle:
    "Color Palette",
  paletteDescription:
    "If you're wondering how we automatically generated the 50-950 shades of each color, bad news - color is complicated and to get the absolute best results we picked all of Tailwind's default colors by hand, meticulously balancing them by eye and testing them in real designs to make sure we were happy with them. If you don't have a set of completely custom colors in mind for your project, you can curate your colors from our default palette by importing tailwindcss/colors in your configuration file and choosing the colors you want to use.",
  classificationTitle:
    "Color Classification",
  classificationDescription:
    "Our color classification simplifies decision-making, aiding both designers and developers in selecting the right hues for various components. Whether you're aiming for a cohesive brand identity or ensuring accessibility, our classification system provides the clarity you need.",
  tokensTitle: 'Color Tokens',
  tokensDescription:
    'Color tokens are the fundamental building blocks of the Plus UI system. They allow for a more scalable, consistent, and manageable approach to the Plus UI design system.',
} as const;

export const colorSystemFigmaNodes = {
  colorPalette: '4922:7320',
  colorClassification: '4922:8423',
  colorTokens: '4922:6167',
} as const;
