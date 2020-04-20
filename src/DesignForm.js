import React from 'react';
import { AutoForm, AutoField } from 'uniforms-material'
import DesignSchema from './DesignSchema';
import Container from '@material-ui/core/Container';

export default function GuestForm() {
    return (
      <Container fixed>
         <AutoForm schema={DesignSchema} onSubmit={console.log} >
      </AutoForm>
      </Container>
      );
  }
