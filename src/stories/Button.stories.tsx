// Button.stories.ts | Button.stories.tsx

import React from 'react'

import { Meta } from '@storybook/react';

import Button from '../components/Button/button';

export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

export const Primary: React.VFC<{}> = () => <Button>Button</Button>;