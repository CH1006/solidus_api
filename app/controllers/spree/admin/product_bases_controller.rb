class Spree::Admin::ProductBasesController < Spree::Admin::BaseController
    skip_before_action :verify_authenticity_token
    def index
      @product_bases = Spree::ProductBase.order('id ASC').all
      respond_to do |format|
        format.html 
        format.json { render json: @product_bases }
      end
    end
    def create
      @product_base = Spree::ProductBase.new(base_params)
      if @product_base.save
        render json: { status: :ok, message: 'Success' }
      else
        render json: { json: @product_base.errors, status: :unprocessable_entity }
      end
    end
    def show
      @product_base = Spree::ProductBase.find(params[:id])
      respond_to do |format|
        format.html 
        format.json { render json: @product_base }
      end
    end
  
    def update
      @product_base = Spree::ProductBase.find(params[:id])
      if @product_base.update(base_params)
        render json: { status: :ok, message: 'Success' }
      else
        render json: { json: @product_base.error, status: :unprocessable_entity }
      end
    end
  
    def destroy
      @product_base = Spree::ProductBase.find(params[:id])
      if @product_base.destroy
        render json: { json: 'ProductBase was successfully deleted.'}
      else
        render json: { json: @product_base.errors, status: :unprocessable_entity }
      end
    end
  
    private
  
    def base_params
      params.require(:product_basis).permit(:id, :title, :description)
    end
end
  