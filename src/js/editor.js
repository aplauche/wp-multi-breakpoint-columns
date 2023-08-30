// WordPress dependencies.
import { InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';

import { addFilter } from '@wordpress/hooks';
import TokenList from '@wordpress/token-list';

import {useEffect} from '@wordpress/element'
import { useSelect } from '@wordpress/data';


const withMultiBreakpoint = ( BlockEdit ) => ( props ) => {

  // Destructure Attributes / ClassName
  const { attributes, setAttributes } = props;
  const {className} = attributes

  // This is taken from the core columns block. When initially inserted the controls are disabled until a column layout has been selected
  const { clientId } = props;
  const hasInnerBlocks = useSelect(
    ( select ) =>
      select( blockEditorStore ).getBlocks( clientId ).length > 0,
    [ clientId ]
  );

  // Listen to changes on mobile collapse setting and disable tablet if mobile is turned off - shouldn't allow collapsed tablet, but not mobile
  useEffect(() => {
    if(attributes.isStackedOnMobile === false) {
      toggleTabletCollapse(false)
    }
  }, [attributes.isStackedOnMobile])

  // Handle toggling classNames and settings
  const toggleTabletCollapse = (enable) => {
    const list = new TokenList( className );

    if(enable){
      list.add( `mbpc-collapse-tablet` );
      return setAttributes({className: list.value, isStackedOnMobile: true })
    } else {
      list.remove( `mbpc-collapse-tablet` );
      return setAttributes({className: list.value});
    }
  }

  // Check if tablet collapse is enabled
  const isTabletCollapseEnabled = () => {
    return className?.includes('mbpc-collapse-tablet')
  }

  // Render control on core columns block
	return 'core/columns' === props.name && hasInnerBlocks ? (
		<>
			<BlockEdit { ...props } />
      <InspectorControls>
        <PanelBody>
          <ToggleControl
              label="Stack on tablet"
              checked={ isTabletCollapseEnabled() }
              onChange={ (val) => {
                toggleTabletCollapse(val);
              } }
          />
        </PanelBody>
      </InspectorControls>
		</>
	) : (
		<BlockEdit { ...props } />
	);
};

addFilter('editor.BlockEdit', 'mbpc/tablet-collapse', withMultiBreakpoint);