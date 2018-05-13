<?php
	/*	
	*	Goodlayers Admin Panel
	*	---------------------------------------------------------------------
	*	This file create the class that help you create the controls admin  
	*	option for custom theme
	*	---------------------------------------------------------------------
	*/	
	
	if( !class_exists('gdlr_admin_option_html') ){
		
		class gdlr_admin_option_html{
			
			// decide to generate each option by type
			function generate_admin_option($settings = array()){
				if( $settings['type'] == 'row' ){
					echo '<div class="gdlr-option-row ' . (empty($settings['class'])? '': $settings['class']) . '">'; return;
				}else if( $settings['type'] == 'close-row' ){
					echo '</div>'; return;
				}else if( $settings['type'] == 'clear' ){
					echo '<div class="clear"></div>'; return;
				}
				
				echo '<div class="gdlr-option-wrapper ';
				echo (isset($settings['wrapper-class']))? $settings['wrapper-class'] : '';
				echo '">';
				
				$description_class = empty($settings['description'])? '': 'with-description';
				echo '<div class="gdlr-option ' . $description_class . '">';
				
				// option title
				if( !empty($settings['title']) ){
					echo '<div class="gdlr-option-title">' . $settings['title'] . '</div>';
				}
				
				// input option
				switch ($settings['type']){
					case 'text': $this->print_text_input($settings); break;
					case 'textarea': $this->print_textarea($settings); break;
					case 'combobox': $this->print_combobox($settings); break;
					case 'font-combobox': $this->print_font_combobox($settings); break;
					case 'multi-combobox': $this->print_multi_combobox($settings); break;
					case 'checkbox': $this->print_checkbox($settings); break;
					case 'radioimage': $this->print_radio_image($settings); break;
					case 'colorpicker': $this->print_color_picker($settings); break;
					case 'skin-settings': $this->print_skin_settings($settings); break;
					case 'sliderbar': $this->print_slider_bar($settings); break;
					case 'slider': $this->print_slider($settings); break;
					case 'upload': $this->print_upload_box($settings); break;
					case 'uploadfont': $this->print_upload_font($settings); break;
					case 'custom': $this->print_custom_option($settings); break;
					case 'date-picker': $this->print_date_picker($settings); break;
					
					case 'description': echo '<div class="gdlr-option-description">' . $settings['description'] . '</div>'; break;
					case 'cnd': $this->print_cnd_option($settings); break;
					case 'fas': $this->print_fas_option($settings); break;
					case 'ssp': $this->print_ssp_option($settings); break;
				}
				
				// input descirption
				if( !empty($settings['description']) && $settings['type'] != 'description' ){
					echo '<div class="gdlr-input-description"><span>' . $settings['description'] . '<span></div>';
					echo '<div class="clear"></div>';
				}
				
				echo '</div>'; // gdlr-option
				echo '</div>'; // gdlr-option-wrapper				
			}

			// print custom option
			function print_custom_option($settings = array()){
				echo '<div class="gdlr-option-input">';
				echo $settings['option'];
				echo '</div>';
			}
			
			// print the input text
			function print_text_input($settings = array()){
				echo '<div class="gdlr-option-input">';
				echo '<input type="text" class="gdl-text-input" name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" ';
				if( isset($settings['value']) ){
					echo 'value="' . esc_attr($settings['value']) . '" ';
				}else if( !empty($settings['default']) ){
					echo 'value="' . esc_attr($settings['default']) . '" ';
				}
				echo empty($settings['data-condition-target'])? '': ' data-condition-target="' . esc_attr($settings['data-condition-target']) . '" ';
				echo empty($settings['data-condition-val'])? '': ' data-condition-val="' . esc_attr($settings['data-condition-val']) . '" ';
				echo '/>';
				echo '</div>';
			}
			
			// print the date picker
			function print_date_picker($settings = array()){
				echo '<div class="gdlr-option-input">';
				echo '<input type="text" class="gdl-text-input gdlr-date-picker" name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" ';
				if( isset($settings['value']) ){
					echo 'value="' . esc_attr($settings['value']) . '" ';
				}else if( !empty($settings['default']) ){
					echo 'value="' . esc_attr($settings['default']) . '" ';
				}
				echo '/>';
				echo '</div>';
			}			
			
			// print the textarea
			function print_textarea($settings = array()){
				echo '<div class="gdlr-option-input ';
				echo (!empty($settings['class']))? $settings['class']: '';
				echo '">';
				
				echo '<textarea name="' . $settings['slug'] . '" data-slug="' . $settings['slug'] . '" ';
				echo (!empty($settings['class']))? 'class="' . $settings['class'] . '"': '';
				echo '>';
				if( isset($settings['value']) ){
					echo $settings['value'];
				}else if( !empty($settings['default']) ){
					echo $settings['default'];
				}
				echo '</textarea>';
				echo '</div>';
			}		

			// print special season prices
			function print_ssp_option($settings = array()){
				echo '<div class="gdlr-option-input ';
				echo (!empty($settings['class']))? $settings['class']: '';
				echo '">';
				
				echo '<div class="gdlr-template"><div class="gdlr-ssp-item-wrapper">';
				echo '<div class="gdlr-ssp-item-remove"><i class="icon-minus fa fa-minus"></i></div>';
				
				echo '<div class="gdlr-ssp-item-inner">';
				echo '<div class="eight columns"><div class="gdlr-ssp-title">' . __('Period', 'gdlr_translate') . '</div><textarea data-slug="date"></textarea></div>';
				echo '<div class="four columns"><div class="gdlr-ssp-description">' . __('Fill the date in yyyy-mm-dd format. Use * for recurring date, separated each date using comma, use the word \'to\' for date range. Ex. *-12-25 to *-12-31 means special season is running every Christmas to New Year\'s Eve every year.', 'gdlr_translate') . '</div></div>';
				echo '<div class="clear"></div>';
				
				if( $settings['room-type'] == 'hostel' ){
					echo '<div class="six columns"><div class="gdlr-ssp-title">' . __('Price Weekend', 'gdlr_translate') . '</div><input type="text" data-slug="bpwe" /></div>';
					echo '<div class="six columns"><div class="gdlr-ssp-title">' . __('Price Weekday', 'gdlr_translate') . '</div><input type="text" data-slug="bpwd" /></div>';
					echo '<div class="clear"></div>';
				}else{
					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Base Price Weekend', 'gdlr_translate') . '</div><input type="text" data-slug="bpwe" /></div>';
					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Base Price Weekday', 'gdlr_translate') . '</div><input type="text" data-slug="bpwd" /></div>';
					echo '<div class="clear"></div>';
					
					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Adult Price', 'gdlr_translate') . '</div><input type="text" data-slug="adwe" /></div>';
					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Children Price', 'gdlr_translate') . '</div><input type="text" data-slug="cpwe" /></div>';
					echo '<div class="four columns"><div class="gdlr-ssp-description">' . __('<strong>Weekend.</strong> Fill only number per person price', 'gdlr_translate') . '</div></div>';
					echo '<div class="clear"></div>';

					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Adult Price', 'gdlr_translate') . '</div><input type="text" data-slug="adwd" /></div>';
					echo '<div class="four columns"><div class="gdlr-ssp-title">' . __('Children Price', 'gdlr_translate') . '</div><input type="text" data-slug="cpwd" /></div>';
					echo '<div class="four columns"><div class="gdlr-ssp-description">' . __('<strong>Weekday.</strong> Fill only number per person price', 'gdlr_translate') . '</div></div>';
					echo '<div class="clear"></div>';	
				}				
				echo '</div>'; // gdlr-ssp-item-inner
				echo '</div></div>';
				
				echo '<textarea id="special-season-price" name="' . $settings['slug'] . '" data-slug="' . $settings['slug'] . '" ';
				echo (!empty($settings['class']))? 'class="' . $settings['class'] . '"': '';
				echo '>';
				if( isset($settings['value']) ){
					echo esc_textarea($settings['value']);
				}else{
					global $post;

					$option_value = gdlr_decode_preventslashes(get_post_meta( $post->ID, 'post-option', true ));
					if( !empty($option_value) ){
						$option_value = json_decode( $option_value, true );					
					}
					if( !(empty($option_value['ss-room-base-price-weekend']) && empty($option_value['ss-adult-price-weekend']) && empty($option_value['ss-children-price-weekend']) &&
						  empty($option_value['ss-room-base-price']) && empty($option_value['ss-adult-price-weekday']) && empty($option_value['ss-children-price-weekday'])) ){
						
						$default_date = get_option('gdlr_old_ssd', '');
						
						$default = array(
							array(
								'date' => $default_date,
								'bpwe' => (empty($option_value['ss-room-base-price-weekend'])?'': $option_value['ss-room-base-price-weekend']),
								'adwe' => (empty($option_value['ss-adult-price-weekend'])?'': $option_value['ss-adult-price-weekend']),
								'cpwe' => (empty($option_value['ss-children-price-weekend'])?'': $option_value['ss-children-price-weekend']),
								'bpwd' => (empty($option_value['ss-room-base-price'])?'': $option_value['ss-room-base-price']),
								'adwd' => (empty($option_value['ss-adult-price-weekday'])?'': $option_value['ss-adult-price-weekday']),
								'cpwd' => (empty($option_value['ss-children-price-weekday'])?'': $option_value['ss-children-price-weekday']),
							)
						);
					}else{
						$default = array();
					}
					echo esc_textarea(json_encode($default));
				}
				echo '</textarea>';
				echo '</div>';
			}
			
			// print consecutive night discount
			function print_cnd_option($settings = array()){
				echo '<div class="gdlr-option-input ';
				echo (!empty($settings['class']))? $settings['class']: '';
				echo '">';

				echo '<div class="gdlr-cnd-option-description" >';
				echo esc_html__('For example, if you set up 7 nights with 20% discount and 14 night with 25% discount. When customer book for 7,8,9,10,11,12,13 consecutive nights, they will get 20% off. However, if they book for 14, 15 ( and so on ) consecutive nights, they will get 25% off.', 'gdlr_translate');
				echo '</div>';
				
				echo '<textarea id="consecutive-night-discount" name="' . $settings['slug'] . '" data-slug="' . $settings['slug'] . '" ';
				echo (!empty($settings['class']))? 'class="' . $settings['class'] . '"': '';
				echo ' data-url="' . esc_url(get_template_directory_uri()) . '" ';
				echo '>';
				if( isset($settings['value']) ){
					echo esc_textarea($settings['value']);
				}else{
					echo '[]';
				}
				echo '</textarea>';
				echo '</div>';
			}	

			// print the facilities and services
			function print_fas_option($settings = array()){
				echo '<div class="gdlr-option-input ';
				echo (!empty($settings['class']))? $settings['class']: '';
				echo '">';
				
				echo '<textarea id="facilities-and-services" name="' . $settings['slug'] . '" data-slug="' . $settings['slug'] . '" ';
				echo (!empty($settings['class']))? 'class="' . $settings['class'] . '"': '';
				echo ' data-url="' . esc_url(get_template_directory_uri()) . '" ';
				echo '>';
				if( isset($settings['value']) ){
					echo esc_textarea($settings['value']);
				}else{
					global $post;

					$option_value = gdlr_decode_preventslashes(get_post_meta( $post->ID, 'post-option', true ));
					if( !empty($option_value) ){
						$option_value = json_decode( $option_value, true );					
					}
					if( !empty($settings['data-type']) && $settings['data-type'] == 'hostel' ){
						$default = array(
							array('title'=>__('Bathroom' , 'gdlr-hotel'), 'value'=> ''),
							array('title'=>__('Max' , 'gdlr-hotel'), 'value'=> ''),
							array('title'=>__('Common Room' , 'gdlr-hotel'), 'value'=> ''),
							array('title'=>__('Wifi' , 'gdlr-hotel'), 'value'=> ''),
							array('title'=>__('Breakfast' , 'gdlr-hotel'), 'value'=> '')
						);
					}else{
						$default = array(
							array('title'=>__('Bed' , 'gdlr-hotel'), 'value'=> (empty($option_value['bed'])?'': $option_value['bed'])),
							array('title'=>__('Max People' , 'gdlr-hotel'), 'value'=> (empty($option_value['max-people'])?'': $option_value['max-people'])),
							array('title'=>__('View' , 'gdlr-hotel'), 'value'=> (empty($option_value['view'])?'': $option_value['view'])),
							array('title'=>__('Room Size' , 'gdlr-hotel'), 'value'=> (empty($option_value['room-size'])?'': $option_value['room-size'])),
							array('title'=>__('Wifi' , 'gdlr-hotel'), 'value'=> (empty($option_value['wifi'])?'': $option_value['wifi'])),
							array('title'=>__('Breakfast Included' , 'gdlr-hotel'), 'value'=> (empty($option_value['breakfast-included'])?'': $option_value['breakfast-included'])),
							array('title'=>__('Room Service' , 'gdlr-hotel'), 'value'=> (empty($option_value['room-service'])?'': $option_value['room-service'])),
							array('title'=>__('Airport Pickup Service' , 'gdlr-hotel'), 'value'=> (empty($option_value['airport-pickup-service'])?'': $option_value['airport-pickup-service']))
						);
					}
					echo esc_textarea(json_encode($default));
				}
				echo '</textarea>';
				echo '</div>';
			}		

			// print the combobox
			function print_combobox($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				$value = '';
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				echo '<div class="gdlr-combobox-wrapper">';
				echo '<select name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" >';
				foreach($settings['options'] as $slug => $name ){
					echo '<option value="' . $slug . '" ';
					echo ($value == $slug)? 'selected ': '';
					echo '>' . $name . '</option>';
				
				}
				echo '</select>';
				echo '</div>'; // gdlr-combobox-wrapper
				
				echo '</div>';
			}	

		
			// print the font combobox
			function print_font_combobox($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				$value = '';
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				echo '<input class="gdlr-sample-font" ';
				echo 'value="' . esc_attr( __('Sample Font', 'gdlr_translate') ) . '" ';
				echo (!empty($value))? 'style="font-family: ' . $value . ';" />' : '/>';
				
				echo '<div class="gdlr-combobox-wrapper">';
				echo '<select name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" class="gdlr-font-combobox" >';
				do_action('gdlr_print_all_font_list', $value);
				echo '</select>';
				echo '</div>'; // gdlr-combobox-wrapper
				
				echo '</div>';
			}	
			
			// print the combobox
			function print_multi_combobox($settings = array()){
				echo '<div class="gdlr-option-input">';

				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}else{
					$value = array();
				}

				echo '<div class="gdlr-multi-combobox-wrapper">';
				echo '<select name="' . $settings['name'] . '[]" data-slug="' . $settings['slug'] . '" multiple >';
				foreach($settings['options'] as $slug => $name ){
					echo '<option value="' . $slug . '" ';
					echo (in_array($slug, $value))? 'selected ': '';
					echo '>' . $name . '</option>';
				
				}
				echo '</select>';
				echo '</div>'; // gdlr-combobox-wrapper
				
				echo '</div>';
			}			

			
			// print the checkbox ( enable / disable )
			function print_checkbox($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				$value = 'enable';
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				echo '<label for="' . $settings['slug'] . '-id" class="checkbox-wrapper">';
				echo '<div class="checkbox-appearance ' . $value . '" > </div>';
				
				echo '<input type="hidden" name="' . $settings['name'] . '" value="disable" />';
				echo '<input type="checkbox" name="' . $settings['name'] . '" id="' . $settings['slug'] . '-id" data-slug="' . $settings['slug'] . '" ';
				echo ($value == 'enable')? 'checked': '';
				echo ' value="enable" />';	
				
				echo '</label>';		
				
				echo '</div>';
			}		

			// print the radio image
			function print_radio_image($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				$value = '';
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				$i = 0;
				foreach($settings['options'] as $slug => $name ){
					echo '<label for="' . $settings['slug'] . '-id' . $i . '" class="radio-image-wrapper ';
					echo ($value == $slug)? 'active ': '';
					echo '">';
					echo '<img src="' . $name . '" alt="" />';
					echo '<div class="selected-radio"></div>';

					echo '<input type="radio" name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" ';
					echo 'id="' . $settings['slug'] . '-id' . $i . '" value="' . $slug . '" ';
					echo ($value == $slug)? 'checked ': '';
					echo ' />';
					
					echo '</label>';
					
					$i++;
				}
				
				echo '<div class="clear"></div>';
				echo '</div>';
			}

			// print color picker
			function print_color_picker($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				echo '<input type="text" class="wp-color-picker" name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" ';
				if( !empty($settings['value']) ){
					echo 'value="' . $settings['value'] . '" ';
				}else if( !empty($settings['default']) ){
					echo 'value="' . $settings['default'] . '" ';
				}
				
				if( !empty($settings['default']) ){
					echo 'data-default-color="' . $settings['default'] . '" ';
				}
				echo '/>';
				
				echo '</div>';
			}	
			
			// print skin settings
			function print_skin_settings($settings = array()){
				echo '<div class="gdlr-option-input" id="skin-setting-wrapper">';	

				// head section
				echo '<div class="gdlr-add-skin-wrapper">';
				echo '<input type="text" class="gdl-text-input" />';				
				echo '<div class="gdlr-add-more-skin"></div>';
				echo '<div class="gdlr-default-skin">';
				echo json_encode($settings['options']);
				echo '</div>';
				echo '<div class="clear"></div>';
				echo '</div>';
				
				echo '<div class="gdlr-add-skin-description">';
				echo __('The skin you created can be used in Color / Background Wrapper Section', 'gdlr_translate');
				echo '</div>';
				echo '<div class="clear"></div>';
				
				// container section
				echo '<div class="gdlr-skin-container" ></div>';
				
				// input section
				echo '<textarea class="gdlr-skin-input" name="' . $settings['name'] . '">';
				echo !empty($settings['value'])? $settings['value']: '';
				echo '</textarea>';
				
				echo '</div>';		
			}			

			// print slider bar
			function print_slider_bar($settings = array()){
				echo '<div class="gdlr-option-input">';
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				// create a blank box for javascript
				echo '<div class="gdlr-sliderbar" data-value="' . $value . '" ></div>';
				
				echo '<input type="text" class="gdlr-sliderbar-text-hidden" name="' . $settings['name'] . '" ';
				echo 'data-slug="' . $settings['slug'] . '" value="' . $value . '" />';
				
				// this will be the box that shows the value
				echo '<div class="gdlr-sliderbar-text">' . $value . 'px</div>';
				
				echo '<div class="clear"></div>';
				echo '</div>';			
			}

			// print slider
			function print_slider($settings = array()){
				echo '<div class="gdlr-option-input ';
				echo (!empty($settings['class']))? $settings['class']: '';
				echo '">';
				
				echo '<textarea name="' . $settings['slug'] . '" data-slug="' . $settings['slug'] . '" ';
				echo 'class="gdlr-input-hidden gdlr-slider-selection" data-overlay="true" data-caption="true" >';
				if( isset($settings['value']) ){
					echo $settings['value'];
				}else if( !empty($settings['default']) ){
					echo $settings['default'];
				}
				echo '</textarea>';
				echo '</div>';
			}				
			
			// print upload box
			function print_upload_box($settings = array()){
				echo '<div class="gdlr-option-input">';
				
				$value = ''; $file_url = '';
				$settings['data-type'] = empty($settings['data-type'])? 'image': $settings['data-type'];
				$settings['data-type'] = ($settings['data-type']=='upload')? 'image': $settings['data-type'];
				
				if( !empty($settings['value']) ){
					$value = $settings['value'];
				}else if( !empty($settings['default']) ){
					$value = $settings['default'];
				}
				
				if( is_numeric($value) ){ 
					$file_url = wp_get_attachment_url($value);
				}else{
					$file_url = $value;
				}
				
				// example image url
				echo '<img class="gdlr-upload-img-sample ';
				echo (empty($file_url) || $settings['data-type'] != 'image')? 'blank': '';
				echo '" ';
				echo (!empty($file_url) && $settings['data-type'] == 'image')? 'src="' . $file_url . '" ': ''; 
				echo '/>';
				echo '<div class="clear"></div>';
				
				// input link url
				echo '<input type="text" class="gdlr-upload-box-input" value="' . $file_url . '" />';					
				
				// hidden input
				echo '<input type="hidden" class="gdlr-upload-box-hidden" ';
				echo 'name="' . $settings['name'] . '" data-slug="' . $settings['slug'] . '" ';
				echo 'value="' . $value . '" />';
				
				// upload button
				echo '<input type="button" class="gdlr-upload-box-button gdl-button" ';
				echo 'data-title="' . $settings['title'] . '" ';
				echo 'data-type="' . $settings['data-type'] . '" ';				
				echo 'data-button="';
				echo (empty($settings['button']))? __('Insert Image', 'gdlr_translate'):$settings['button'];
				echo '" ';
				echo 'value="' . __('Upload', 'gdlr_translate') . '"/>';
				
				echo '<div class="clear"></div>';
				echo '</div>';
			}			

			// print upload font
			function print_upload_font($settings = array()){
				echo '<div class="gdlr-option-input" id="upload-font-wrapper">';	
				
				// head section
				echo '<div class="gdlr-upload-font-title-wrapper">';
				echo '<div class="gdlr-upload-font-title">' . __('Upload font', 'gdlr_translate') . '</div>';
				echo '<div class="gdlr-add-more-font"></div>';
				$this->print_font_item();
				echo '<div class="clear"></div>';
				echo '</div>';
				
				// container section
				echo '<div class="gdlr-upload-font-container" >';
				if( isset( $settings['value'] ) ){
					$font_list = json_decode($settings['value'], true);
					if( !empty($font_list) ){
						foreach( $font_list as $font_item ){
							$this->print_font_item( $font_item ); 
						}
					}
				}
				echo '</div>';
				
				// input section
				echo '<textarea class="gdlr-upload-font-input" name="' . $settings['name'] . '">';
				echo !empty($settings['value'])? $settings['value']: '';
				echo '</textarea>';
				
				echo '</div>';
			}
			function print_font_item($value = array()){
				echo '<div class="gdlr-font-item-wrapper">';
				
				// font name section
				echo '<div class="gdlr-font-item">';
				echo '<span class="gdlr-font-input-label" >' . __('Font Name', 'gdlr_translate') . '</span>';
				echo '<input class="gdlr-font-input" data-type="font-name" type="text" ';
				echo (!empty($value['font-name']))? 'value="' . $value['font-name'] . '" ' : '';
				echo '/>';
				echo '<div class="clear"></div>';
				echo '</div>';				
				
				// eot type
				echo '<div class="gdlr-font-item">';
				echo '<span class="gdlr-font-input-label" >' . __('EOT Font', 'gdlr_translate') . '</span>';
				echo '<input class="gdlr-font-input" data-type="font-eot" type="text" ';
				if( !empty($value['font-eot']) ){
					if( is_numeric($value['font-eot']) ){
						echo 'value="' . wp_get_attachment_url($value['font-eot']) . '" ';				
					}else{
						echo 'value="' . $value['font-eot'] . '" ';
					}
				}
				echo '/>';
				echo '<input class="gdlr-upload-font-button gdl-button" type="button" value="' . __('Upload', 'gdlr_translate') . '" />';
				echo '<div class="clear"></div>';
				echo '</div>';
				
				// ttf format
				echo '<div class="gdlr-font-item last">';
				echo '<span class="gdlr-font-input-label" >' . __('TTF Font', 'gdlr_translate') . '</span>';
				echo '<input class="gdlr-font-input" data-type="font-ttf" type="text" ';
				if( !empty($value['font-ttf']) ){
					if( is_numeric($value['font-ttf']) ){
						echo 'value="' . wp_get_attachment_url($value['font-ttf']) . '" ';
					}else{
						echo 'value="' . $value['font-ttf'] . '" ';
					}
				}
				echo '/>';
				echo '<input class="gdlr-upload-font-button gdl-button" type="button" value="' . __('Upload', 'gdlr_translate') . '" />';
				echo '<div class="clear"></div>';
				echo '</div>';
				
				// delete font button
				echo '<div class="gdlr-delete-font-item"></div>';
				echo '<div class="clear"></div>';
				echo '</div>'; // gdlr-font-item-wrapper
			
			}
			
		}

	}
		
?>