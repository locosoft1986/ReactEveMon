import { configure } from '@kadira/storybook';

function loadStories() {
  require('../app/components/stories');
}

configure(loadStories, module);
