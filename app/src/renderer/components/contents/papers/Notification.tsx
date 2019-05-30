import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {
  FormControl,
  OutlinedInput,
  FormLabel,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotificationConfig from '../../../../lib/config/NotificationConfig';

const styles = {
  root: {
    padding: '30px'
  },
  divider: {
    'margin-top': '10px'
  },
  form: {
    'margin-bottom': '20px'
  },
  formContainer: {
    display: 'flex',
    'align-items': 'flex-start',
    'flex-direction': 'column'
  },
  formControl: {
    width: '80%'
  },
  formLabel: {
    'margin-bottom': '8px'
  },
  formInputRoot: {
    'margin-bottom': '10px',
  },
  formInput: {
    'padding-top': '8px',
    'padding-bottom': '8px',
  },
  formButton: {
    boxShadow: 'none'
  }
}

interface Props extends WithStyles<typeof styles> {
  mailAddresses?: string[],
};

interface State {
  mailAddresses: string[],
}

const AddButton: React.FC<{onClick: () => void}> = (props) => (
  <Button variant="contained" color="primary" onClick={props.onClick}>
    <AddIcon/>メールアドレスを追加
  </Button>
);

class Notification extends React.Component<Props, State> {

  private config: NotificationConfig;

  constructor(props: Props) {
    super(props);
    this.config = new NotificationConfig();

    const mailAddresses = this.config.read().mailAddresses;
    this.state = {mailAddresses: mailAddresses};
  }

  addMailAddres = (mailAddress = '') => {
    this.setState({mailAddresses: this.state.mailAddresses.concat([mailAddress])});
  }

  handleChangeEmailAdress = (index: number) => (e: React.ChangeEvent) => {
    const value = (e.target as any).value;
    const mailAddresses = this.state.mailAddresses;
    mailAddresses[index] = value;
    this.setState({mailAddresses});
  }

  save = () => {
    const mailAddresses = this.state.mailAddresses.filter((mailAddress) => mailAddress !== '');
    this.config.save({
      mailAddresses: mailAddresses
    });
  }

  render() {
    const mailAddressInputs = this.state.mailAddresses.map((mailAddress, i) => (
      <OutlinedInput
        key={i}
        fullWidth={true}
        value={mailAddress}
        labelWidth={0}
        classes={{root: this.props.classes.formInputRoot, input: this.props.classes.formInput}}
        onChange={this.handleChangeEmailAdress(i)}
      />
    ))

    return(
      <div>
        <div className={this.props.classes.form}>
        <Typography variant="h6">通知先</Typography>
          <Divider className={this.props.classes.divider}/>
          <div className={this.props.classes.formContainer}>
            <FormControl margin="normal" className={this.props.classes.formControl}>
              <FormLabel className={this.props.classes.formLabel}>メールアドレス</FormLabel>
            </FormControl>
            {mailAddressInputs}
            <AddButton
              onClick={() => this.addMailAddres()}
            />
          </div>
        </div>
        <FormControl margin="normal">
          <Button
            variant="contained"
            color="primary"
            className={this.props.classes.formButton}
            onClick={this.save}
          >
            保存
          </Button>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Notification);