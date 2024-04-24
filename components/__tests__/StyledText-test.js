import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';

describe('MonoText component', () => {
  it('renders "Snapshot test!" correctly', () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();

    // Add the following line to check if the snapshot is up-to-date
    expect(renderer.create(tree).toJSON()).toMatchSnapshot();
  });
});
