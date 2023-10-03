import React from 'react';
import ReactDOM from 'react-dom';
import { isTSAnyKeyword } from '@babel/types';

import RegisterTopics from '../components/Student/RegisterTopics';
import EvPresentation from "./components/Panel/evPresentation";
import SupervisorAccept from '../components/Staff/SupervisorAccept';



it('renders without error', () => {
    const element = document.createElement('div');
    ReactDOM.render(<RegisterTopics></RegisterTopics>, element)
  });

  it('renders without error', () => {
    const element = document.createElement('div');
    ReactDOM.render(<CreateGroup></CreateGroup>, element)
  });

  it('renders without error', () => {
    const element = document.createElement('div');
    ReactDOM.render(<EvTopics></EvTopics>, element)
  });

  it('renders without error', () => {
    const element = document.createElement('div');
    ReactDOM.render(<RegisterTopics></RegisterTopics>, element)
  });

  it('renders without error', () => {
    const element = document.createElement('div');
    ReactDOM.render(<SupervisorAccept></SupervisorAccept>, element)
  });

  