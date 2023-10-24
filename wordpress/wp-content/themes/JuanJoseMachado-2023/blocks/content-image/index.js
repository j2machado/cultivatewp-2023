import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

registerBlockType('cwp/content-image', {
    
    attributes: {
        reverse: {
            type: 'boolean',
            default: false,
        },
        backgroundColor: {
            type: 'string',
            default: 'primary',
        },
    },

    edit: compose([
        withSelect((select, ownProps) => {
            const { getBlockAttributes } = select('core/block-editor');
            const { clientId } = ownProps;
            const blockAttributes = getBlockAttributes(clientId);
            return {
                blockAttributes,
            };
        }),
    ])((props) => {
        const { attributes, setAttributes, blockAttributes } = props;
        const blockProps = useBlockProps({
            className: attributes.reverse ? 'is-reversed' : '',
        });
    
        const TEMPLATE = [
            ['core/image', {}],
            ['core/group', {}, [
                ['core/heading', { placeholder: 'Add heading...' }],
                ['core/paragraph', { placeholder: 'Add text...' }],
            ]],
        ];
    
        useEffect(() => {
            if (blockAttributes && blockAttributes.reverse !== undefined) {
                setAttributes({ reverse: blockAttributes.reverse });
            }
        }, [blockAttributes]);
    
        const toggleReverse = () => {
            setAttributes({ reverse: !attributes.reverse });
        };
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={true}>
                        <ToggleControl
                            label="Reverse Layout"
                            checked={attributes.reverse}
                            onChange={toggleReverse}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks template={TEMPLATE} templateLock="all" />
                    {/* Front-end rendering */}
                    <div className="content-image-block">
                   
                    </div>
                </div>
            </>
        );
    }),

    save: function (props) {
        const { reverse } = props.attributes;
        const blockProps = useBlockProps.save({
            className: reverse ? 'is-reversed' : '',
        });
    
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
    

    render: function (props) {
        const { attributes } = props;
        const classNames = ['content-image-block'];

        if (attributes.reverse) {
            classNames.push('is-reversed');
        }

        return (
            <div className={classNames.join(' ')}>
                <InnerBlocks.Content />
            </div>
        );
    },
});