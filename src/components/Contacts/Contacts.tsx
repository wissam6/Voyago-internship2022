import { Header } from '../Header/Header';
import { Form, Field, FormElement, FieldWrapper, FieldRenderProps } from "@progress/kendo-react-form";
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  arrowRotateCwIcon
} from "@progress/kendo-svg-icons";
import { MapContainer } from './MapContainer/MapContainer';
import { Footer } from '../Footer/Footer';
import './Contacts.css'

const LabelNameInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    visited,
    label,
    id,
    valid,
    disabled,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = visited && validationMessage;
  return <FieldWrapper>
    <div className='contactsNameField'>
      <Label className="nameLabel" editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <Input className="contactsInputStyle" valid={valid} type={'text'} disabled={disabled} {...others} />
    </div>
    {showValidationMessage && <Error>{validationMessage}</Error>}
  </FieldWrapper>;
};

const LabelEmailInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    visited,
    label,
    id,
    valid,
    disabled,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = visited && validationMessage;
  return <FieldWrapper>
    <div className='contactsEmailField'>
      <Label className="emailLabel" editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <Input className="contactsInputStyle" valid={valid} type={'email'} disabled={disabled} {...others} />
    </div>
    {showValidationMessage && <Error>{validationMessage}</Error>}
  </FieldWrapper>;
};

const LabelTextInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    visited,
    label,
    id,
    valid,
    disabled,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = visited && validationMessage;
  return <FieldWrapper>
    <div className='textAreaField'>
      <Label className="textLabel" editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <TextArea className="textAreaInput" valid={valid} disabled={disabled} {...others} />
    </div>
    {showValidationMessage && <Error>{validationMessage}</Error>}
  </FieldWrapper>;
};

const ValidationInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    visited,
    label,
    id,
    valid,
    disabled,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = visited && validationMessage;
  return <FieldWrapper>
    <div className='validationField'>
      <Label className="botLabel" editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <Input className="valInput" valid={valid} type={'text'} disabled={disabled} {...others} />
      <Hint className='hintStyle'>Type the characters you see in the picture above.</Hint>
      <img className='captchaImage' src={require('../../images/captcha.png')} alt='captcha'></img>
      <SvgIcon className='refreshIcon' icon={arrowRotateCwIcon}></SvgIcon>
    </div>
    {showValidationMessage && <Error>{validationMessage}</Error>}
  </FieldWrapper>;
};

export const Contacts = () => {
  return (
    <div className='contacts'>
      <div className='frame'>
        <Header />
        <div className='contactsFrame'>Contacts</div>
        <div className='Form'>
          <Form render={formRenderProps => <FormElement style={{
            maxWidth: 650
          }}>
            <div className='form-fields'>
              <Field name={'name'} label={'Name'} component={LabelNameInput} />
              <Field name={'email'} label={'Email'} component={LabelEmailInput} />
              <Field name={'message'} label={'Message'} component={LabelTextInput} />
              <Field name={'botVal'} label={'Anti-bot validation'} component={ValidationInput}></Field>
            </div>
          </FormElement>} />
        </div>
        <div className='buttonWrapper'>
          <Button className='submitButton'>
            <span className='submitText'>Submit</span>
          </Button>
        </div>
        <div className='locationText'>United States <br></br>
          932 Clousson Road Str <br></br>
          Sergeant Bluff, Iowa <br></br>
          712-923-1916 <br></br>
          51054United States <br></br>
          932 Clousson Road Str <br></br>
          Sergeant Bluff, Iowa <br></br>
          712-923-1916 <br></br>
          51054</div>
        <div className='map'>
          <MapContainer />
        </div>
        <div style={{
          position:'absolute',
          top:'102em'
        }}>
        <Footer/>
        </div>
      </div>
      
    </div>
  )
}