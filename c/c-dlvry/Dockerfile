ARG ECR_URL
ARG HTTPD_BASE_IMAGE_TAG_VERSION
FROM $ECR_URL/baseimages:ui_base_image_$HTTPD_BASE_IMAGE_TAG_VERSION
RUN rm -r /usr/local/apache2/htdocs/*
RUN rm -r /usr/local/apache2/conf/httpd.conf
RUN mkdir /usr/local/apache2/htdocs/associate_cntr_delivery_ui
COPY httpd.config /usr/local/apache2/conf/httpd.conf
COPY ./dist/ /usr/local/apache2/htdocs/associate_cntr_delivery_ui/ 
RUN chmod -R 755 /usr/local/apache2/htdocs/associate_cntr_delivery_ui/
EXPOSE 80