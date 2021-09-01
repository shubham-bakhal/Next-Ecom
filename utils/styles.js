import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: 'rgba(0, 182, 122, 0.87)',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  searchInput: {
    paddingLeft: 5,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  iconButton: {
    backgroundColor: '#f8c040',
    padding: 5,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  sort: {
    marginRight: 5,
  },

  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '30px',
  },
  flexing:{
    display: "flex",
    alignItems:"center"
  },
  Btn: {
    whiteSpace: 'nowrap',
    border: 0,
    outline: 0,
    display: 'inlineBlock',
    height: '40px',
    width: "100%",
    lineHeight: '40px',
    padding: '0 14px',
    boxShadow:
      '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    backgroundColor: '#6772e5',
    textDecoration: 'none',
    transition: 'all 150ms ease',
    marginTop: '10px',
    "&:hover": {
      color: "#fff",
      cursor: "pointer",
      backgroundColor: "#7795f8",
      transform: "translateY(-1px)",
      boxShadow:"0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
    }
  },
  label: {
    color:" #6b7c93",
    fontWeight: 300,
    fontSize: "18px",
    letterSpacing: "0.025em",
  }
}));
export default useStyles;
