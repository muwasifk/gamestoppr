class AppListSerializer(serializers.Serializer):
    app_list = serializers.ListField(
        child=serializers.CharField(max_length=100)
    )

    def validate_app_list(self, value):
        # Add any validation for the app_list here
        return value

