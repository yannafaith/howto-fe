import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVert from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import parse from 'html-react-parser';
// import {useAppState} from "@newstackdev/iosdk/dist/overmind";

const styles = theme => ({
  card: {
    maxWidth: 500,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardWrapper: {
    position: 'relative',
    margin: '1rem auto',
    [theme.breakpoints.up('sm')]: {
      margin: '1rem',
      width: 'calc(50% - 2rem)'
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(33.33% - 2rem)'
    }
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    flexGrow: 1,
    alignItems: 'flex-end'
  },
  likes: {
    marginBottom: '1rem'
  },
  noHover: {
    transition: '200ms',
    '&:hover': {
      backgroundColor: 'initial',
      transform: 'scale(1.2)'
    }
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: '95%'
  }
});

const HowToCard = props => {
  const [state, setState] = useState({open: false});
  // const nc = useAppState();

  const handleToggle = () => {
    setState({ open: !state.open });
  };

  const handleClose = event => {
    // if (this.anchorEl.contains(event.target)) return;
    setState({ open: false });
  };

  const handleDelete = () => {
    props.delete(props.post.id);
  };

  const handleEdit = () => {
    const { match, history, post } = props;
    const navigate = match.url.endsWith('new') ? history.replace : history.push;
    navigate(`${match.url}/new`, [post]);
  };

  const handleLike = () => {
    const { edit, post } = props;
    edit(post.id, { likes: post.likes + 1 });
  };

    const { open } = state;
    const { classes, user } = props;
    const { title, body, updated_at, likes } = props.post;
    const initials = user ? (user.firstName[0] + user.lastName[0]).toUpperCase() : 'X';

    return (
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {initials}
              </Avatar>
            }
            action={
              <IconButton
                buttonRef={node => {
                  // this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <MoreVert />
              </IconButton>
            }
            title={title}
            subheader={updated_at}
          />
          <Popper open={open} transition disablePortal placement="bottom-end">
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleEdit} className={classes.menuItem}>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText inset primary="Edit" />
                      </MenuItem>
                      <MenuItem onClick={handleDelete} className={classes.menuItem}>
                        <ListItemIcon>
                          <Delete />
                        </ListItemIcon>
                        <ListItemText inset primary="Delete" />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {/* <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" /> */}
          <CardContent>
            <Typography>{parse(body)}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites" className={classes.noHover} onClick={handleLike}>
              <FavoriteIcon />
            </IconButton>
            {/* TODO: replace these with likes */}
            <small className={classes.likes}>{likes || 0}</small>
            <IconButton aria-label="Share" className={classes.noHover}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
}

HowToCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HowToCard);
