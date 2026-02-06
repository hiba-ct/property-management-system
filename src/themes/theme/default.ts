// project-imports
import { ThemeMode } from 'config';

// types
import { PaletteThemeProps } from 'types/theme';

// ==============================|| PRESET THEME - PMS (MAROON) ||============================== //

export default function Default(mode: ThemeMode): PaletteThemeProps {
  const contrastText = '#ffffff';

  // ===== PMS PRIMARY (MAROON / WINE) =====
  let primaryColors = [
    '#F6EDEE', // lighter
    '#E7C9CE', // 100
    '#D8A4AC', // 200
    '#C47C86', // light
    '#B05B66', // 400
    '#8D3C4A', // main
    '#8f1f30', // dark#563c40
    '#6B2732', // 700
    '#5C2029', // darker
    '#4A161E'  // 900
  ];

  // ===== PMS SECONDARY (NEUTRAL GREY) =====
  let secondaryColors = [
    '#FAFAFA',
    '#F4F6F8',
    '#E9ECEF',
    '#DEE2E6',
    '#CED4DA',
    '#ADB5BD',
    '#6C757D',
    '#495057',
    '#343A40',
    '#212529'
  ];

  // ===== STATUS COLORS =====
  let errorColors = ['#fdecea', '#f1998e', '#e5533d', '#d32f2f', '#b71c1c'];
  let warningColors = ['#fff4e5', '#ffd699', '#ffb020', '#f79009', '#b54708'];
  let infoColors = ['#e6f4ff', '#91caff', '#4096ff', '#1677ff', '#0958d9'];
  let successColors = ['#edf7ed', '#a5d6a7', '#66bb6a', '#2e7d32', '#1b5e20'];

  // ===== DARK MODE =====
  if (mode === ThemeMode.DARK) {
    primaryColors = [
      '#4A161E',
      '#5C2029',
      '#6B2732',
      '#7A2E3B',
      '#8D3C4A',
      '#B05B66',
      '#C47C86',
      '#D8A4AC',
      '#E7C9CE',
      '#F6EDEE'
    ];

    secondaryColors = [
      '#121212',
      '#1E1E1E',
      '#2A2A2A',
      '#3A3A3A',
      '#4A4A4A',
      '#6C6C6C',
      '#9E9E9E',
      '#CFCFCF',
      '#E5E5E5',
      '#F5F5F5'
    ];
  }

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],   // 🔥 PMS MAIN COLOR
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText
    },

    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      500: secondaryColors[5],
      main: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      contrastText
    },

    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText
    },

    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText
    },

    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText
    },

    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText
    }
  };
}
