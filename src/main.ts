import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './index.scss'

import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.svelte'
import { mount } from "svelte";

const app = mount(App, {
    target: document.getElementById('app')!,
});

export default app;
