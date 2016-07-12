import BasemapToggle from 'esri/widgets/BasemapToggle';
import Compass from 'esri/widgets/Compass';
import Home from 'esri/widgets/Home';
import Legend from 'esri/widgets/Legend';
import Search from 'esri/widgets/Search';

export function addWidgets(view) {
  const toggle = new BasemapToggle({
    view, nextBasemap: 'hybrid'
  });
  const compass = new Compass({ view });
  const home = new Home({ view });
  const legend = new Legend({ view });
  const search = new Search({ view });
  view.ui.add(legend, 'bottom-left');
  view.ui.add(toggle, 'bottom-left');
  view.ui.add(home, 'top-left');
  view.ui.add(compass, 'top-left');
  view.ui.add(search, 'top-right');
}