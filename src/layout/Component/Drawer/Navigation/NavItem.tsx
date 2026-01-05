import { matchPath, useLocation, Link } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';

// third-party
import { FormattedMessage } from 'react-intl';

// api & config
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { MenuOrientation, NavActionType } from 'config';
import useConfig from 'hooks/useConfig';

// types
import { LinkTarget, NavItemType } from 'types/menu';

interface Props {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  setSelectedID?: Function;
}

// ==============================|| NAVIGATION - ITEM ||============================== //

export default function NavItem({ item, level, isParents = false, setSelectedID }: Props) {
  const downLG = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const { pathname } = useLocation();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { menuOrientation } = useConfig();

  // ================= SELECTED LOGIC =================
  const isSelected = Boolean(
    item.url &&
      matchPath(
        { path: item.url, end: false },
        pathname
      )
  );

  let itemTarget: LinkTarget = '_self';
  if (item.target) itemTarget = '_blank';

  const itemHandler = () => {
    if (downLG) handlerDrawerOpen(false);
    if (isParents && setSelectedID) setSelectedID();
  };

  // ================= COLOR LOGIC =================
  const isParent = item.type === 'collapse' || item.type === 'group';

  const iconColor = isParent
    ? '#6B7280'               // parent = neutral gray
    : item.iconColor ?? '#6B7280'; // child = manual color

  const textColor = iconColor;

  // ================= ICON =================
  const Icon = item.icon as any;

  const itemIcon = item.icon ? (
    <Icon
      variant="Linear"
      size={drawerOpen ? 20 : 22}
      color={iconColor}
    />
  ) : null;

  // ================= RENDER =================
  return (
    <>
      {(menuOrientation === MenuOrientation.VERTICAL || downLG) && (
        <Box sx={{ position: 'relative' }}>
          <ListItemButton
            component={Link}
            to={item.url!}
            target={itemTarget}
            disabled={item.disabled}
            selected={isSelected}
            onClick={itemHandler}
            sx={{
              mx: 1.25,
              my: 0.5,
              borderRadius: 1,
              pl:
                level === 2
                  ? 3.25
                  : drawerOpen
                  ? (level * 20) / 8
                  : 2,
              py: 1,
              bgcolor: isSelected ? 'secondary.100' : 'transparent',
              '&:hover': {
                bgcolor: 'secondary.200'
              }
            }}
          >
            {/* ICON */}
            {itemIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  ...(!drawerOpen &&
                    level === 1 && {
                      borderRadius: 1,
                      width: 46,
                      height: 46,
                      alignItems: 'center',
                      justifyContent: 'center'
                    })
                }}
              >
                {itemIcon}
              </ListItemIcon>
            )}

            {/* DOT (no icon case) */}
            {!itemIcon && drawerOpen && (
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Dot size={isSelected ? 6 : 5} color="secondary" />
              </ListItemIcon>
            )}

            {/* TEXT */}
            {(drawerOpen || level !== 1) && (
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      color: textColor,
                      fontWeight: isSelected ? 500 : 400
                    }}
                  >
                    <FormattedMessage id={item.title} />
                  </Typography>
                }
              />
            )}

            {/* CHIP */}
            {item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={<FormattedMessage id={item.chip.label as string} />}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )}
          </ListItemButton>

          {/* ACTION ICONS */}
          {item.actions &&
            item.actions.map((action, index) => {
              const ActionIcon = action.icon as any;
              return (
                <IconButton
                  key={index}
                  {...(action.type === NavActionType.FUNCTION && {
                    onClick: (event) => {
                      event.stopPropagation();
                      action.function?.();
                    }
                  })}
                  {...(action.type === NavActionType.LINK && {
                    component: Link,
                    to: action.url,
                    target: action.target ? '_blank' : '_self'
                  })}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 10,
                    width: 20,
                    height: 20,
                    p: 0.25
                  }}
                >
                  <ActionIcon size={12} />
                </IconButton>
              );
            })}
        </Box>
      )}
    </>
  );
}
